import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostStuffPage } from './post-stuff.page';

const routes: Routes = [
  {
    path: '',
    component: PostStuffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostStuffPageRoutingModule {}
