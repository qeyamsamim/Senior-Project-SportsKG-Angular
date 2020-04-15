import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { BookingsService } from '../football-fields/bookings/bookings.service';
import { Booking } from '../football-fields/bookings/booking.model';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, IonItemSliding } from '@ionic/angular';
import { FavoriteField } from '../football-fields/field-details/favorite-field.model';
import { FavoriteFieldService } from '../football-fields/field-details/favorite-field.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;
  isLoading = false;
  isBookingHistory = true;
  loadedFields: FavoriteField[];
  private fieldSub: Subscription;

  constructor(
    private bookingService: BookingsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private favoriteField: FavoriteFieldService
  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
    this.fieldSub = this.favoriteField.favoriteField.subscribe(fields => {
      this.loadedFields = fields;
    })
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchUserBookings().subscribe(() => {
      this.isLoading = false;
    });
    this.favoriteField.fetchFavFields().subscribe(() => {
      this.isLoading = false;
    });
  }

  onProfileEdit() {
    console.log('Works');
  }

  onChangeSegmentBtns(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'favorites') {
      this.isBookingHistory = true;
    } else {
      this.isBookingHistory = false;
    }
  }

  onDeleteBtn(bookingId: string, slidingItem: IonItemSliding) {
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to from it from history?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({message: 'Deleting...' }).then(loadingEl => {
              loadingEl.present();
              this.bookingService.deleteBooking(bookingId).subscribe();
              loadingEl.dismiss();
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
        }
      ],
    })
    .then(alertEl => {
      alertEl.present();
    });
    slidingItem.close();
  }

  onDeleteField(fieldId: string, slidingItem: IonItemSliding) {
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to remove it from Favorite Football Fields?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({message: 'Deleting...' }).then(loadingEl => {
              loadingEl.present();
              this.favoriteField.deleteField(fieldId).subscribe();
              loadingEl.dismiss();
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
        }
      ],
    })
    .then(alertEl => {
      alertEl.present();
    });
    slidingItem.close();
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }

    if (this.fieldSub) {
      this.fieldSub.unsubscribe();
    }
  }

}
