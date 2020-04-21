import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';
import { AuthService } from '../authentication/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface ContactData {
  userId: string;
  userName: string;
  message: string;
}

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

  fetchMessages() {
    return this.http.get<{[key: string]: ContactData }>('https://sportskg-4a84d.firebaseio.com/user-messages.json')
    .pipe(map(resData => {
      const messages = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          messages.push(new Contact(
            key,
            resData[key].userId,
            resData[key].userName,
            resData[key].message
          ));
        }
      }
      return messages;
    }),
    tap(messages => {
      this._messages.next(messages);
    })
    );
  }

  getMessages(id: string) {
    return this.http.get<ContactData>(
      `https://sportskg-4a84d.firebaseio.com/user-messages/${id}.json`
    ).pipe(
      map(messageData => {
        return new Contact(
          id,
          messageData.userId,
          messageData.userName,
          messageData.message
        );
    }));
  }

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

  deleteMessage(messageId: string) {
    return this.http.delete(
      `https://sportskg-4a84d.firebaseio.com/user-messages/${messageId}.json`
    ).pipe(
      switchMap(() => {
        return this.messages;
      }),
      take(1),
      tap(msgs => {
        this._messages.next(msgs.filter(m => m.id !== messageId));
      })
    );
  }
}
