import { Component, OnInit, Input } from '@angular/core';
import { FootballField } from '../football-fields.model';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.scss'],
})
export class CreateBookingsComponent implements OnInit {
  @Input() selectedField: FootballField;

  bookingTimes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  date = new Date();
  today = new Date();
  tomorrow = new Date(this.date.setDate(this.date.getDate() + 1));
  ThridDay = new Date(this.date.setDate(this.date.getDate() + 1));
  isBooked = false;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onClickBooking(time: number, date: Date) {
    this.alertCtrl
      .create({
        header: 'Booking',
        message: 'Do you want to book from ' + time + ' - ' + +(time + 1) + ' for Today ?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.modalCtrl.dismiss();
              this.isBooked = true;
              //this.router.navigate(['/football-fields']);
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
