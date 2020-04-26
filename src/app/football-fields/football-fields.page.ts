import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FootballFieldsService } from './football-fields.service';
import { FootballField } from './football-fields.model';
import { Subscription } from 'rxjs';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-football-fields',
  templateUrl: './football-fields.page.html',
  styleUrls: ['./football-fields.page.scss'],
})
export class FootballFieldsPage implements OnInit, OnDestroy {
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;

  loadedFootballFields: FootballField[];
  isLoading = false;
  private fieldsSub: Subscription;

  constructor(private footballFieldService: FootballFieldsService) { }

  ngOnInit() {
    this.fieldsSub = this.footballFieldService.footballFields.subscribe(footballField => {
      this.loadedFootballFields = footballField;
    });
  }

  searchField(event: any) {
    this.fieldsSub = this.footballFieldService.footballFields.subscribe(footballField => {
      this.loadedFootballFields = footballField;
    });
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.loadedFootballFields = this.loadedFootballFields.filter(field => {
        return (field.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  ionViewWillEnter() {
    this.searchInput.value = '';
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
