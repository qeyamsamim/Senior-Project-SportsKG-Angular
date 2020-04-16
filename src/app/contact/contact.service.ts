import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';
import { AuthService } from '../authentication/auth.service';
import { take, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _messages = new BehaviorSubject<Contact[]>([]);

  get messages() {
    return this._messages.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  sendMessage(userName: string, message: string) {
    let generatedId: string;
    let newMessage: Contact;

    return this.authService.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user id found!');
      }
      newMessage = new Contact(
        Math.random().toString(),
        userId,
        userName,
        message
      );
      return this.http.post<{name: string}>(
        'https://sportskg-4a84d.firebaseio.com/user-messages.json',
        { ...newMessage, id: null }
      );
    }), switchMap(resData => {
          generatedId = resData.name;
          return this.messages;
        }),
        take(1),
        tap(messages => {
          newMessage.id = generatedId;
          this._messages.next(messages.concat(newMessage));
          }
        )
    );
  }
}
