import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMessagesPageRoutingModule } from './user-messages-routing.module';

import { UserMessagesPage } from './user-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMessagesPageRoutingModule
  ],
  declarations: [UserMessagesPage]
})
export class UserMessagesPageModule {}
