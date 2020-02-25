import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({keyboardClose: true, message: 'Logging in...'})
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(resData => {
          console.log(resData);
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/home');
        }, errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not sign up!';
          if (code === 'EMAIL_EXISTS') {
            message = 'This Email address already exist.';
          } else if (code === 'EMAIL_NOT_FOUND') {
            message = 'Email Address Could not be Found.';
          } else if (code === 'INVALID_PASSWORD') {
            message = 'The Password is not Correct.';
          }
          this.showAlert(message);
        });
      });
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    const gender = form.value.gender;
    // console.log(email, password, name, gender);

    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Authentication Failed',
      message: message,
      buttons: ['Okay']}).then(alertEl => alertEl.present());
  }
}
