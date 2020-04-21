import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/contact/contact.model';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contact/contact.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.page.html',
  styleUrls: ['./user-messages.page.scss'],
})
export class UserMessagesPage implements OnInit, OnDestroy {
  loadedMessages: Contact[];
  isLoading = false;
  private messagesSub: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.messagesSub = this.contactService.messages.subscribe(message => {
      this.loadedMessages = message;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.contactService.fetchMessages().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.messagesSub) {
      this.messagesSub.unsubscribe();
    }
  }

}
