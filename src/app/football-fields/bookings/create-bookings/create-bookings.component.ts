import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FootballField } from '../../football-fields.model';
import { ModalController, AlertController } from '@ionic/angular';
import { BookingsService } from '../bookings.service';
import { Subscription } from 'rxjs';
import { Booking } from '../booking.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.scss'],
})
export class CreateBookingsComponent implements OnInit, OnDestroy {
  @Input() selectedField: FootballField;

  bookingTimes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  //today = this.datePipe.transform( new Date, 'yyyy/MM/dd');
  today = new Date().toLocaleDateString();
  date = new Date();
  tomorrow = new Date(this.date.setDate(this.date.getDate() + 1));
  ThridDay = new Date(this.date.setDate(this.date.getDate() + 1));
  isBooked = '';
  isLoading = false;
  private bookingSub: Subscription;
  loadedBookings: Booking[];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private bookingService: BookingsService,
    //public datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchFieldBookings(this.selectedField.id).subscribe(() => {
      this.isLoading = false;
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onClickBooking(time: number, date: Date) {
    this.alertCtrl
      .create({
        header: 'Booking',
        message: 'Do you want to book from ' + time + ' - ' + +(time + 1) + ' for Today?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
                this.isBooked = 'Booked';
                this.modalCtrl.dismiss(
                  {
                    bookingData: {
                      time,
                      date: new Date(),
                      bookingDate: date,
                    }
                  },
                  'confirm');
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

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
