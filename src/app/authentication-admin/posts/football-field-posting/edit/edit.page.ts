import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootballField } from 'src/app/football-fields/football-fields.model';
import { Subscription } from 'rxjs';
import { FootballFieldsService } from 'src/app/football-fields/football-fields.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  loadedFootballFields: FootballField[];
  isLoading = false;
  private fieldsSub: Subscription;

  constructor(
    private footballFieldService: FootballFieldsService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.fieldsSub = this.footballFieldService.footballFields.subscribe(footballField => {
      this.loadedFootballFields = footballField;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.footballFieldService.fetchFields().subscribe(() => {
      this.isLoading = false;
    });
  }

  deleteBtn(fieldId: string) {
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
                this.footballFieldService.deleteField(fieldId).subscribe();
                loadingEl.dismiss();
              });
            }
          },
          {
            text: 'No',
            handler: () => {
              this.router.navigate(['/authentication-admin/posts/football-field-posting/tabs/edit']);
            }
          }
        ],
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    if (this.fieldsSub) {
      this.fieldsSub.unsubscribe();
    }
  }

}
