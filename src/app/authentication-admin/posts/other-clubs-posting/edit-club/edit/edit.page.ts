import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SportClubs } from 'src/app/other-sport-clubs/sport-clubs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { OtherSportClubsService } from 'src/app/other-sport-clubs/other-sport-clubs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;
  isLoading = false;
  private clubSub: Subscription;
  sportClubs: SportClubs;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private clubService: OtherSportClubsService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('clubId')) {
        this.navCtrl.navigateBack('/authentication-admin/posts/other-clubs-posting/tabs/edit-club');
        return;
      }
      this.isLoading = true;
      this.clubSub = this.clubService
        .getSportClubs(paramMap.get('clubId'))
        .subscribe(
          clubs => {
            this.sportClubs = clubs;
            this.form = new FormGroup({
              name: new FormControl(this.sportClubs.name, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              description: new FormControl(this.sportClubs.description, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              address: new FormControl(this.sportClubs.address, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              contactNum: new FormControl(this.sportClubs.contactNum, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(10)]
              }),
              location: new FormControl(this.sportClubs.location, {
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
                    this.router.navigate(['/authentication-admin/posts/other-clubs-posting/tabs/edit-club']);
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

  onUpdateClub() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating Sport Club...'
    }).then(loadingEl => {
      loadingEl.present();
      this.clubService.updateClub(
        this.sportClubs.id,
        this.form.value.name,
        this.form.value.description,
        this.form.value.address,
        this.form.value.contactNum,
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/authentication-admin/posts/other-clubs-posting/tabs/edit-club']);
      });
    });
  }

}
