import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsPostingPage } from './news-posting.page';

const routes: Routes = [
  {
    path: '',
    component: NewsPostingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPostingPageRoutingModule {}
