import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStuffPageRoutingModule } from './edit-stuff-routing.module';

import { EditStuffPage } from './edit-stuff.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditStuffPageRoutingModule
  ],
  declarations: [EditStuffPage]
})
export class EditStuffPageModule {}
