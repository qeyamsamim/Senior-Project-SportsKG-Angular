import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'main-page',
        children: [
        {
          path: '',
          loadChildren: () => import('./main-page/main-page.module').then( m => m.MainPagePageModule)
        },
        {
          path: ':newsId',
          loadChildren: () => import('../news/news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
        }
      ]},
      {
        path: 'discover',
        children: [
        {
          path: '',
          loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
        },
        {
          path: ':fieldId',
          loadChildren: () => import('../football-fields/field-details/field-details.module').then( m => m.FieldDetailsPageModule)
        },
        {
          path: ':stuffId',
          loadChildren: () => import('../sport-stuff/stuff-details/stuff-details.module').then( m => m.StuffDetailsPageModule)
        }
      ]},
      {
        path: '',
        redirectTo: '/home/tabs/main-page',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/main-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
