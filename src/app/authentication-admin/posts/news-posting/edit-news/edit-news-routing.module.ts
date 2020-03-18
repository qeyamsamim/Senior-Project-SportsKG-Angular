import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNewsPage } from './edit-news.page';

const routes: Routes = [
  {
    path: '',
    component: EditNewsPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNewsPageRoutingModule {}
