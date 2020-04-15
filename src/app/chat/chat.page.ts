import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService, Message } from './chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
//import { Content } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  //@ViewChild(Content) content: Content;

  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.messages = this.chatService.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val))
    );
  }

  sendMessage() {
    this.chatService.converse(this.formValue);
    this.formValue = '';
  }

  // GoToBottom() {
  //   setTimeout(() => {
  //     if(this.content._scroll) {
  //       this.content.scrollToBottom();
  //     }
  //   }, 500);
  // }

}
