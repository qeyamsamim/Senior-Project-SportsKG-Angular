import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootballField } from 'src/app/football-fields/football-fields.model';
import { FootballFieldsService } from 'src/app/football-fields/football-fields.service';
import { Subscription } from 'rxjs';
import { SportStuff } from 'src/app/sport-stuff/sport-stuff.model';
import { SportStuffService } from 'src/app/sport-stuff/sport-stuff.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedFootballFields: FootballField[];
  private fieldsSub: Subscription;
  loadedStuff: SportStuff[];
  private stuffSub: Subscription;
  isLoading = false;

  slideOptions = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      loop: true
    }
  };

  constructor(
    private footballFieldService: FootballFieldsService,
    private stuffService: SportStuffService
  ) { }

  ngOnInit() {
    this.fieldsSub = this.footballFieldService.footballFields.subscribe(footballField => {
      this.loadedFootballFields = footballField;
    });
    this.stuffSub = this.stuffService.sportStuff.subscribe(stuff => {
      this.loadedStuff = stuff.reverse();
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.footballFieldService.fetchFields().subscribe(() => {
      this.isLoading = false;
    });
    this.stuffService.fetchNewStuff().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.fieldsSub) {
      this.fieldsSub.unsubscribe();
    }
    if (this.stuffSub) {
      this.stuffSub.unsubscribe();
    }
  }
}
