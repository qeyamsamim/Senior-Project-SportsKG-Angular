import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FootballFieldsPage } from './football-fields.page';

const routes: Routes = [
  {
    path: '',
    component: FootballFieldsPage
  },
  {
    path: ':fieldId',
    loadChildren: () => import('./field-details/field-details.module').then( m => m.FieldDetailsPageModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FootballFieldsPageRoutingModule {}
