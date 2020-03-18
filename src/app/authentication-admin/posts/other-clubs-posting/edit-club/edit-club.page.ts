import { Component, OnInit, OnDestroy } from '@angular/core';
import { SportClubs } from 'src/app/other-sport-clubs/sport-clubs.model';
import { Subscription } from 'rxjs';
import { OtherSportClubsService } from 'src/app/other-sport-clubs/other-sport-clubs.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.page.html',
  styleUrls: ['./edit-club.page.scss'],
})
export class EditClubPage implements OnInit, OnDestroy {
  loadedClubs: SportClubs[];
  isLoading = false;
  private clubSub: Subscription;

  constructor(
    private clubService: OtherSportClubsService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.clubSub = this.clubService.sportClubs.subscribe(clubs => {
      this.loadedClubs = clubs;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.clubService.fetchSportClubs().subscribe(() => {
      this.isLoading = false;
    });
  }

  deleteBtn(clubId: string) {
    this.alertCtrl
      .create({
        header: 'Delete',
        message: 'Are you sure you want to delete it?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.loadingCtrl.create({message: 'Deleting...' }).then(loadingEl => {
                loadingEl.present();
                this.clubService.deleteClub(clubId).subscribe();
                loadingEl.dismiss();
              });
            }
          },
          {
            text: 'No',
            handler: () => {
              this.router.navigate(['/authentication-admin/posts/other-clubs-posting/tabs/edit-club']);
            }
          }
        ],
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    if (this.clubSub) {
      this.clubSub.unsubscribe();
    }
  }

}
