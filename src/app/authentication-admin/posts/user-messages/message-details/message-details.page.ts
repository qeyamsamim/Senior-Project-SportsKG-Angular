import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/contact/contact.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ContactService } from 'src/app/contact/contact.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.page.html',
  styleUrls: ['./message-details.page.scss'],
})
export class MessageDetailsPage implements OnInit {
  message: Contact;
  messageSub: Subscription;
  isLoading = false;
  messageId: string;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private contactService: ContactService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('messageId')) {
        this.navCtrl.navigateBack('/football-fields');
        return;
      }
      this.isLoading = true;
      this.messageSub = this.contactService.getMessages(paramMap.get('messageId')).subscribe(msg => {
        this.message = msg;
        this.messageId = msg.id;
        this.isLoading = false;
      },
      // It checks if a message id exists or not.
      error => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Could not load the page',
          buttons: [{
            text: 'Okay',
            handler: () => {
            this.router.navigate(['/authentication-admin/posts/user-messages']);
          }}]
        }).then(alertEl => alertEl.present());
      });
    });
  }

  deleteBtn(messageId: string) {
    this.alertCtrl
      .create({
        header: 'Delete',
        message: 'Are you sure you want to delete it?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.loadingCtrl.create({message: 'Deleting...' }).then(loadingEl => {
                loadingEl.present();
                this.contactService.deleteMessage(messageId).subscribe();
                loadingEl.dismiss();
                this.router.navigate(['/authentication-admin/posts/user-messages']);
              });
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
