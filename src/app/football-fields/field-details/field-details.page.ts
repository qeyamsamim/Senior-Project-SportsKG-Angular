import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootballField } from '../football-fields.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { FootballFieldsService } from '../football-fields.service';
import { CreateBookingsComponent } from '../create-bookings/create-bookings.component';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.page.html',
  styleUrls: ['./field-details.page.scss'],
})
export class FieldDetailsPage implements OnInit, OnDestroy {
  footballField: FootballField;
  fieldSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private footballFieldService: FootballFieldsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
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
    });
  }

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
