import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewsPostingPageRoutingModule } from './news-posting-routing.module';

import { NewsPostingPage } from './news-posting.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewsPostingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewsPostingPage]
})
export class NewsPostingPageModule {}
