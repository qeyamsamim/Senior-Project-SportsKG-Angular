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
          loadChildren: './main-page/main-page.module#MainPagePageModule'
        }
      ]},
      {
        path: 'discover',
        children: [
        {
          path: '',
          loadChildren: './discover/discover.module#DiscoverPageModule'
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
