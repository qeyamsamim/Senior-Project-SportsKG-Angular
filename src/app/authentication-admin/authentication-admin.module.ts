import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationAdminPageRoutingModule } from './authentication-admin-routing.module';

import { AuthenticationAdminPage } from './authentication-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationAdminPageRoutingModule
  ],
  declarations: [AuthenticationAdminPage]
})
export class AuthenticationAdminPageModule {}
