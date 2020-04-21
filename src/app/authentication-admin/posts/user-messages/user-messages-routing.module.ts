import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMessagesPage } from './user-messages.page';

const routes: Routes = [
  {
    path: '',
    component: UserMessagesPage
  },
  {
    path: ':messageId',
    loadChildren: () => import('./message-details/message-details.module').then( m => m.MessageDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMessagesPageRoutingModule {}
