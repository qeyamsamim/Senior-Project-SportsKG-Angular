import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FootballFieldsPageRoutingModule } from './football-fields-routing.module';

import { FootballFieldsPage } from './football-fields.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FootballFieldsPageRoutingModule
  ],
  declarations: [FootballFieldsPage]
})
export class FootballFieldsPageModule {}
