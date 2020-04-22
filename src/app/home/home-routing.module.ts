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
        }
      ]},
      {
        path: 'discover',
        children: [
        {
          path: '',
          loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
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
