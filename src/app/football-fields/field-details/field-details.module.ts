import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FieldDetailsPageRoutingModule } from './field-details-routing.module';

import { FieldDetailsPage } from './field-details.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBookingsComponent } from '../bookings/create-bookings/create-bookings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FieldDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [FieldDetailsPage, CreateBookingsComponent],
  entryComponents: [CreateBookingsComponent]
})
export class FieldDetailsPageModule {}
