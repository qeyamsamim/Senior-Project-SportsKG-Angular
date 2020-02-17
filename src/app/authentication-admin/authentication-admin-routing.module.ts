import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationAdminPage } from './authentication-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationAdminPage
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationAdminPageRoutingModule {}
