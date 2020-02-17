import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsPage } from './posts.page';

const routes: Routes = [
  {
    path: '',
    component: PostsPage
  },
  {
    path: 'football-field-posting',
    loadChildren: () => import('./football-field-posting/football-field-posting.module').then( m => m.FootballFieldPostingPageModule)
  },
  {
    path: 'other-clubs-posting',
    loadChildren: () => import('./other-clubs-posting/other-clubs-posting.module').then( m => m.OtherClubsPostingPageModule)
  },
  {
    path: 'news-posting',
    loadChildren: () => import('./news-posting/news-posting.module').then( m => m.NewsPostingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule {}
