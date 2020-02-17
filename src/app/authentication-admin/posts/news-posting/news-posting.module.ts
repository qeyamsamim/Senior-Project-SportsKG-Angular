import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPostingPageRoutingModule } from './news-posting-routing.module';

import { NewsPostingPage } from './news-posting.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewsPostingPageRoutingModule
  ],
  declarations: [NewsPostingPage]
})
export class NewsPostingPageModule {}
