import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportStuffPage } from './sport-stuff.page';

const routes: Routes = [
  {
    path: '',
    component: SportStuffPage
  },
  {
    path: 'post-stuff',
    loadChildren: () => import('./post-stuff/post-stuff.module').then( m => m.PostStuffPageModule)
  },
  {
    path: ':stuffId',
    loadChildren: () => import('./stuff-details/stuff-details.module').then( m => m.StuffDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportStuffPageRoutingModule {}
