import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SportStuff } from '../../sport-stuff.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SportStuffService } from '../../sport-stuff.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-stuff',
  templateUrl: './edit-stuff.page.html',
  styleUrls: ['./edit-stuff.page.scss'],
})
export class EditStuffPage implements OnInit, OnDestroy {
  form: FormGroup;
  sportStuff: SportStuff;
  private stuffSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private stuffsService: SportStuffService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('stuffId')) {
        this.navCtrl.navigateBack('/sport-stuff');
        return;
      }
      this.isLoading = true;
      this.stuffSub = this.stuffsService.getStuff(paraMap.get('stuffId')).subscribe(stuff => {
        this.sportStuff = stuff;
        this.form = new FormGroup({
          name: new FormControl(this.sportStuff.name, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.sportStuff.description, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          condition: new FormControl(this.sportStuff.condition, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          city: new FormControl(this.sportStuff.city, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          price: new FormControl(this.sportStuff.price, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
        this.isLoading = false;
      }, error => {
        this.alertCtrl
          .create({
            header: 'An error occurred!',
            message: 'The page cannot be loaded',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/authentication-admin/posts/football-field-posting/tabs/edit']);
                }
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });
      });
    });
  }

  onUpdatePost() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating Post...'
    }).then(loadingEl => {
      loadingEl.present();
      this.stuffsService.updatePost(
        this.sportStuff.id,
        this.form.value.name,
        this.form.value.description,
        this.form.value.condition,
        this.form.value.price,
        this.form.value.city
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/sport-stuff']);
      });
    });
  }

  ngOnDestroy() {
    if (this.stuffSub) {
      this.stuffSub.unsubscribe();
    }
  }
}
