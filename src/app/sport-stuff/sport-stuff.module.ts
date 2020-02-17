import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportStuffPageRoutingModule } from './sport-stuff-routing.module';

import { SportStuffPage } from './sport-stuff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportStuffPageRoutingModule
  ],
  declarations: [SportStuffPage]
})
export class SportStuffPageModule {}
