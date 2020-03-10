import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface BookingData {
  bookedDate: Date;
  bookedTime: number;
  bookingTime: Date;
  fieldImage: string;
  fieldId: string;
  fieldName: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addBooking(fieldId: string, bookedDate: Date, bookedTime: number, bookingTime: Date) {
    let generatedId: string;
    let newBooking: Booking;
    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user id found!');
      }
      newBooking = new Booking(
        Math.random().toString(),
        fieldId,
        'fieldName',
        'https://leeuflames.com/images/2015/9/22/soccer_field_001.jpg',
        userId,
        bookedDate,
        bookedTime,
        bookingTime
      );
      return this.http.post<{name: string}>(
        'https://sportskg-4a84d.firebaseio.com/bookings.json',
        {...newBooking, id: null}
      );
    }), switchMap(resData => {
      generatedId = resData.name;
      return this.bookings;
    }),
    take(1),
    tap(bookings => {
      newBooking.id = generatedId;
      this._bookings.next(bookings.concat(newBooking));
    }));
  }

  fetchUserBookings() {
    return this.authService.userId.pipe(switchMap(userId => {
      if (!userId) {
        throw new Error('User not found!');
      }
      return this.http.get<{[key: string]: BookingData }>(
        `https://sportskg-4a84d.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${
          userId
        }"`
      );
    }),
    map(bookingData => {
      const bookings = [];
      for (const key in bookingData) {
        if (bookingData.hasOwnProperty(key)) {
          bookings.push(
            new Booking(
              key,
              bookingData[key].fieldId,
              bookingData[key].fieldImage,
              bookingData[key].fieldName,
              bookingData[key].userId,
              bookingData[key].bookedDate,
              bookingData[key].bookedTime,
              bookingData[key].bookingTime
            )
          );
        }
      }
      return bookings;
    }), tap(bookings => {
      this._bookings.next(bookings);
    }));
  }
}
