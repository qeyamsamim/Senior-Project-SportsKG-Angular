import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostClubPageRoutingModule } from './post-club-routing.module';

import { PostClubPage } from './post-club.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostClubPageRoutingModule,
    SharedModule
  ],
  declarations: [PostClubPage]
})
export class PostClubPageModule {}
