import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootballFieldsService } from './football-fields.service';
import { FootballField } from './football-fields.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-football-fields',
  templateUrl: './football-fields.page.html',
  styleUrls: ['./football-fields.page.scss'],
})
export class FootballFieldsPage implements OnInit, OnDestroy {
  loadedFootballFields: FootballField[];
  isLoading = false;
  private fieldsSub: Subscription;

  constructor(private footballFieldService: FootballFieldsService) { }

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

  ngOnDestroy() {
    if (this.fieldsSub) {
      this.fieldsSub.unsubscribe();
    }
  }
}
