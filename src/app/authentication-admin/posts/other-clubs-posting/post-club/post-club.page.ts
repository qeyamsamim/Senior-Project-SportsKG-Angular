import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OtherSportClubsService } from 'src/app/other-sport-clubs/other-sport-clubs.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlaceLocation } from 'src/app/home/location.model';

@Component({
  selector: 'app-post-club',
  templateUrl: './post-club.page.html',
  styleUrls: ['./post-club.page.scss'],
})
export class PostClubPage implements OnInit {
  form: FormGroup;

  constructor(
    private sportClubService: OtherSportClubsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      contactNum: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(10)]
      }),
      location: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onCreatePost() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Posting Club...'
    }).then(loadingEl => {
      loadingEl.present();
      this.sportClubService.addSportClub(
        this.form.value.name,
        this.form.value.description,
        this.form.value.address,
        this.form.value.contactNum,
        this.form.value.location
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/other-sport-clubs']);
      })
    });
  }

}
