import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostNewsPageRoutingModule } from './post-news-routing.module';

import { PostNewsPage } from './post-news.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostNewsPageRoutingModule,
    SharedModule
  ],
  declarations: [PostNewsPage]
})
export class PostNewsPageModule {}
