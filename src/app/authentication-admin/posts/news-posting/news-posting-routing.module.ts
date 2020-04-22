import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsPostingPage } from './news-posting.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: NewsPostingPage,
    children: [
      {
        path: 'post-news',
        children: [
          {
            path: '',
            loadChildren: () => import('./post-news/post-news.module').then( m => m.PostNewsPageModule)
          }
        ]
      },
      {
        path: 'edit-news',
        children: [
          {
            path: '',
            loadChildren: () => import('./edit-news/edit-news.module').then( m => m.EditNewsPageModule)
          },
          {
            path: 'edit/:newsId',
            loadChildren: () => import('./edit-news/edit/edit.module').then( m => m.EditPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/authentication-admin/posts/news-posting/tabs/post-news',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/authentication-admin/posts/news-posting/tabs/post-news',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPostingPageRoutingModule {}
