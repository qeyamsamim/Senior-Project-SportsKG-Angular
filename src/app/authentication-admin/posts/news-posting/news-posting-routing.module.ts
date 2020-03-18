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
            loadChildren: './post-news/post-news.module#PostNewsPageModule'
          }
        ]
      },
      {
        path: 'edit-news',
        children: [
          {
            path: '',
            loadChildren: './edit-news/edit-news.module#EditNewsPageModule'
          },
          {
            path: 'edit/:newsId',
            loadChildren: './edit-news/edit/edit.module#EditPageModule'
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
