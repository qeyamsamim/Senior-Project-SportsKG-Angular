import { Component, OnInit, OnDestroy } from '@angular/core';
import { SportStuff } from '../sport-stuff.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SportStuffService } from '../sport-stuff.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-stuff-details',
  templateUrl: './stuff-details.page.html',
  styleUrls: ['./stuff-details.page.scss'],
})
export class StuffDetailsPage implements OnInit, OnDestroy {
  sportStuff: SportStuff;
  isLoading = false;
  private sportStuffSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sportStuffService: SportStuffService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('stuffId')) {
        this.navCtrl.navigateBack('/sport-stuff');
        return;
      }
      this.isLoading = true;
      this.sportStuffSub = this.sportStuffService.getStuff(paramMap.get('stuffId')).subscribe(sportStuff => {
        this.sportStuff = sportStuff;
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could load the page.',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.router.navigate(['/sport-stuff']);
            }
          }]
        }).then(alertEl => alertEl.present());
      });
    });
  }

  ngOnDestroy() {
    if (this.sportStuffSub) {
      this.sportStuffSub.unsubscribe();
    }
  }

  // Function for button which deletes sport stuffs.
  deleteBtn(stuffId: string) {
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to delete it?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({message: 'Deleting...' }).then(loadingEl => {
              loadingEl.present();
              this.sportStuffService.deleteStuff(stuffId).subscribe();
              loadingEl.dismiss();
              this.router.navigate(['/sport-stuff']);
            });
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ],
    })
    .then(alertEl => {
      alertEl.present();
    });
  }
}
