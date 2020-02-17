import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostStuffPageRoutingModule } from './post-stuff-routing.module';

import { PostStuffPage } from './post-stuff.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostStuffPageRoutingModule,
    SharedModule
  ],
  declarations: [PostStuffPage]
})
export class PostStuffPageModule {}
