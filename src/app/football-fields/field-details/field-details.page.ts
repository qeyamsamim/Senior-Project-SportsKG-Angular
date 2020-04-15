import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootballField } from '../football-fields.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FootballFieldsService } from '../football-fields.service';
import { CreateBookingsComponent } from '../bookings/create-bookings/create-bookings.component';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { BookingsService } from '../bookings/bookings.service';
import { FavoriteField } from './favorite-field.model';
import { FavoriteFieldService } from './favorite-field.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.page.html',
  styleUrls: ['./field-details.page.scss'],
})
export class FieldDetailsPage implements OnInit, OnDestroy {
  footballField: FootballField;
  fieldSub: Subscription;
  isLoading = false;
  fieldId: string;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private footballFieldService: FootballFieldsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private bookingService: BookingsService,
    private loadingCtrl: LoadingController,
    private favoriteFieldService: FavoriteFieldService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('fieldId')) {
        this.navCtrl.navigateBack('/football-fields');
        return;
      }
      this.isLoading = true;
      this.fieldSub = this.footballFieldService.getField(paramMap.get('fieldId')).subscribe(field => {
        this.footballField = field;
        this.fieldId = field.id;
        this.isLoading = false;
      },
      // It checks if a football field id exists or not.
      error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could not load the page',
          buttons: [{
            text: 'Okay',
            handler: () => {
            this.router.navigate(['/football-fields']);
          }}]
        }).then(alertEl => alertEl.present());
      });
    });
  }

  onBookField() {
    this.modalCtrl
    .create({
      component: CreateBookingsComponent,
      componentProps: { selectedField: this.footballField}
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        this.loadingCtrl
          .create({message: 'Booking Field...'})
          .then(loadingEl => {
            loadingEl.present();
            const data = resultData.data.bookingData;
            this.bookingService.addBooking(
              this.footballField.id,
              this.footballField.name,
              data.date, data.time,
              data.bookingDate
            ).subscribe(() => {
              loadingEl.dismiss();
            });
          });
        }
    });
  }

  // Adds Favorite Football Fields
  onAddFavField() {
    this.loadingCtrl.create({
      message: 'Adding to Favorite Football Fields ...'
    }).then(loadingEl => {
      loadingEl.present();
      this.favoriteFieldService.addFavField(this.fieldId, this.footballField.name, this.footballField.imgUrl).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  // Shows the location of Football Fields
  onShowFullMap() {
    this.modalCtrl.create({
      component: MapModalComponent,
      componentProps: {
        center: { lat: this.footballField.location.lat, lng: this.footballField.location.lng },
        selectable: false,
        closeButtonText: 'Close',
        title: this.footballField.location.address
      }
    }).then(modalEl => {
      modalEl.present();
    });
  }

  ngOnDestroy() {
    if (this.fieldSub) {
      this.fieldSub.unsubscribe();
    }
  }
}
