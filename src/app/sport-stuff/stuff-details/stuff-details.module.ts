import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StuffDetailsPageRoutingModule } from './stuff-details-routing.module';

import { StuffDetailsPage } from './stuff-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StuffDetailsPageRoutingModule
  ],
  declarations: [StuffDetailsPage]
})
export class StuffDetailsPageModule {}
