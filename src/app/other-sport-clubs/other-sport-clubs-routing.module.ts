import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherSportClubsPage } from './other-sport-clubs.page';

const routes: Routes = [
  {
    path: '',
    component: OtherSportClubsPage
  },
  {
    path: ':clubId',
    loadChildren: () => import('./club-details/club-details.module').then( m => m.ClubDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherSportClubsPageRoutingModule {}
