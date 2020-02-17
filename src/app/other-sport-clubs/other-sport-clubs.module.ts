import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherSportClubsPageRoutingModule } from './other-sport-clubs-routing.module';

import { OtherSportClubsPage } from './other-sport-clubs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherSportClubsPageRoutingModule
  ],
  declarations: [OtherSportClubsPage]
})
export class OtherSportClubsPageModule {}
