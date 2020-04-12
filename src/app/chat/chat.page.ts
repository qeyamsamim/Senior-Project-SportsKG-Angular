import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from './chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
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

}
