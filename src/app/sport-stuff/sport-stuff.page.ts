import { Component, OnInit, OnDestroy } from '@angular/core';
import { SportStuff } from './sport-stuff.model';
import { SportStuffService } from './sport-stuff.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sport-stuff',
  templateUrl: './sport-stuff.page.html',
  styleUrls: ['./sport-stuff.page.scss'],
})
export class SportStuffPage implements OnInit, OnDestroy {
  loadedSportStuff: SportStuff[];
  isLoading = false;
  private sportStuffSub: Subscription;

  constructor(private sportStuffService: SportStuffService) { }

  ngOnInit() {
    this.sportStuffSub = this.sportStuffService.sportStuff.subscribe(sportStuff => {
      this.loadedSportStuff = sportStuff;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.sportStuffService.fetchNewStuff().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.sportStuffSub) {
      this.sportStuffSub.unsubscribe();
    }
  }
}
