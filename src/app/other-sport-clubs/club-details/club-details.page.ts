import { Component, OnInit, OnDestroy } from '@angular/core';
import { SportClubs } from '../sport-clubs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { OtherSportClubsService } from '../other-sport-clubs.service';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.page.html',
  styleUrls: ['./club-details.page.scss'],
})
export class ClubDetailsPage implements OnInit, OnDestroy {
  sportClubs: SportClubs;
  private clubsSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private clubService: OtherSportClubsService,
    private alertCtrl: AlertController,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('clubId')) {
        this.navCtrl.navigateBack('/other-sport-clubs');
        return;
      }
      this.isLoading = true;
      this.clubsSub = this.clubService.getSportClubs(paraMap.get('clubId')).subscribe(sportClubs => {
        this.sportClubs = sportClubs;
        this.isLoading = false;
      },
      // It checks if a club id exists or not.
      error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could load the page.',
          buttons: [{
            text: 'Okay',
            handler: () => {
              this.router.navigate(['/other-sport-clubs']);
            }
          }]
        }).then(alertEl => alertEl.present());
      });
    });
  }

  onShowFullMap() {
    this.modalCtrl.create({
      component: MapModalComponent,
      componentProps: {
        center: { lat: this.sportClubs.location.lat, lng: this.sportClubs.location.lng },
        selectable: false,
        closeButtonText: 'Close',
        title: this.sportClubs.location.address
      }
    }).then(modalEl => {
      modalEl.present();
    });
  }

  ngOnDestroy() {
    if (this.clubsSub) {
      this.clubsSub.unsubscribe();
    }
  }
}
