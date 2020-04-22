import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherClubsPostingPage } from './other-clubs-posting.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: OtherClubsPostingPage,
    children: [
      {
        path: 'post-club',
        children: [
          {
            path: '',
            loadChildren: () => import('./post-club/post-club.module').then( m => m.PostClubPageModule)
          }
        ]
      },
      {
        path: 'edit-club',
        children: [
          {
            path: '',
            loadChildren: () => import('./edit-club/edit-club.module').then( m => m.EditClubPageModule)
          },
          {
            path: 'edit/:clubId',
            loadChildren: () => import('./edit-club/edit/edit.module').then( m => m.EditPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/authentication-admin/posts/other-clubs-posting/tabs/post-club',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/authentication-admin/posts/other-clubs-posting/tabs/post-club',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherClubsPostingPageRoutingModule {}
