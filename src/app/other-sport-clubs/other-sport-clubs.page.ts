import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SportClubs } from './sport-clubs.model';
import { OtherSportClubsService } from './other-sport-clubs.service';
import { Subscription } from 'rxjs';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-other-sport-clubs',
  templateUrl: './other-sport-clubs.page.html',
  styleUrls: ['./other-sport-clubs.page.scss'],
})
export class OtherSportClubsPage implements OnInit, OnDestroy {
  @ViewChild('searchInput', {static: false}) searchInput: IonSearchbar;
  loadedSportClubs: SportClubs[];
  private clubsSub: Subscription;
  isLoading = false;

  constructor(private otherSportClubsService: OtherSportClubsService) { }

  searchClub(event: any) {
    this.clubsSub = this.otherSportClubsService.sportClubs.subscribe(sportClubs => {
      this.loadedSportClubs = sportClubs;
    });
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.loadedSportClubs = this.loadedSportClubs.filter(club => {
        return (club.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  ngOnInit() {
    this.clubsSub = this.otherSportClubsService.sportClubs.subscribe(sportClubs => {
      this.loadedSportClubs = sportClubs;
    });
  }

  ionViewWillEnter() {
    this.searchInput.value = '';
    this.isLoading = true;
    this.otherSportClubsService.fetchSportClubs().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.clubsSub) {
      this.clubsSub.unsubscribe();
    }
  }
}
