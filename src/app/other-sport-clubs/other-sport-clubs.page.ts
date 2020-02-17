import { Component, OnInit, OnDestroy } from '@angular/core';
import { SportClubs } from './sport-clubs.model';
import { OtherSportClubsService } from './other-sport-clubs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-other-sport-clubs',
  templateUrl: './other-sport-clubs.page.html',
  styleUrls: ['./other-sport-clubs.page.scss'],
})
export class OtherSportClubsPage implements OnInit, OnDestroy {
  loadedSportClubs: SportClubs[];
  private clubsSub: Subscription;
  isLoading = false;

  constructor(private otherSportClubsService: OtherSportClubsService) { }

  ngOnInit() {
    this.clubsSub = this.otherSportClubsService.sportClubs.subscribe(sportClubs => {
      this.loadedSportClubs = sportClubs;
    });
  }

  ionViewWillEnter() {
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
