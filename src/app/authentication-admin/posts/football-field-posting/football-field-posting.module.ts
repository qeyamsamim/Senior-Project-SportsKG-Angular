import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FootballFieldPostingPage } from './football-field-posting.page';
import { FootballFieldRoutingModule } from './football-field-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FootballFieldRoutingModule
  ],
  declarations: [FootballFieldPostingPage]
})
export class FootballFieldPostingPageModule {}
