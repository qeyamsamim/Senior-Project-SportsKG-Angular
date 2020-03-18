import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostClubPage } from './post-club.page';

const routes: Routes = [
  {
    path: '',
    component: PostClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostClubPageRoutingModule {}
