import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  form: FormGroup;
  constructor(
    private loadingCtrl: LoadingController,
    private contactService: ContactService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      message: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Posting ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.contactService.sendMessage(this.form.value.name, this.form.value.message).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.alertCtrl.create({
          header: 'Message Sent!',
          message: 'Your message has been sent! Thank you for contacting us.',
          buttons: ['Ok']
        }).then(alertEl => alertEl.present());
      });
    });
  }

}
