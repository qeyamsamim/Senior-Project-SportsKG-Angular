import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StuffDetailsPage } from './stuff-details.page';

const routes: Routes = [
  {
    path: '',
    component: StuffDetailsPage
  },
  {
    path: ':stuffId',
    loadChildren: () => import('./edit-stuff/edit-stuff.module').then( m => m.EditStuffPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StuffDetailsPageRoutingModule {}
