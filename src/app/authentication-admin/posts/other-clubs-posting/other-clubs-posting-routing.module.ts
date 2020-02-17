import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherClubsPostingPage } from './other-clubs-posting.page';

const routes: Routes = [
  {
    path: '',
    component: OtherClubsPostingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherClubsPostingPageRoutingModule {}
