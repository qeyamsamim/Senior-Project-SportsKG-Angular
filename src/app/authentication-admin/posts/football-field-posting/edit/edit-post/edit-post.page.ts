import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballFieldsService } from 'src/app/football-fields/football-fields.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FootballField } from 'src/app/football-fields/football-fields.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit, OnDestroy {
  footballField: FootballField;
  private fieldSub: Subscription;
  form: FormGroup;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fieldService: FootballFieldsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('fieldId')) {
        this.navCtrl.navigateBack('/authentication-admin/posts/football-field-posting/tabs/edit');
        return;
      }
      this.isLoading = true;
      this.fieldSub = this.fieldService
        .getField(paramMap.get('fieldId'))
        .subscribe(
          field => {
            this.footballField = field;
            this.form = new FormGroup({
              name: new FormControl(this.footballField.name, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              address: new FormControl(this.footballField.address, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              contactNum: new FormControl(this.footballField.contNum, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(10)]
              }),
              location: new FormControl(this.footballField.location, {
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
        }
      );
    });
  }

  onUpdateField() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating Fields...'
    }).then(loadingEl => {
      loadingEl.present();
      this.fieldService.updateField(
        this.footballField.id,
        this.form.value.name,
        this.form.value.address,
        this.form.value.contactNum,
        this.form.value.location
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/authentication-admin/posts/football-field-posting/tabs/edit']);
      });
    });
  }

  ngOnDestroy() {
    if (this.fieldSub) {
      this.fieldSub.unsubscribe();
    }
  }
}
