import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FootballFieldsService } from 'src/app/football-fields/football-fields.service';
import { PlaceLocation } from 'src/app/home/location.model';



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  form: FormGroup;

  constructor(
    private fieldService: FootballFieldsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
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
      message: 'Creating Field...'
    }).then(loadingEl => {
      loadingEl.present();
      this.fieldService.addField(
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
}
