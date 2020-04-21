import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
 // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'football-fields',
    loadChildren: () => import('./football-fields/football-fields.module').then( m => m.FootballFieldsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'sport-stuff',
    loadChildren: () => import('./sport-stuff/sport-stuff.module').then( m => m.SportStuffPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'authentication-admin',
    loadChildren: () => import('./authentication-admin/authentication-admin.module').then( m => m.AuthenticationAdminPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'other-sport-clubs',
    loadChildren: () => import('./other-sport-clubs/other-sport-clubs.module').then( m => m.OtherSportClubsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'forum',
    loadChildren: () => import('./forum/forum.module').then( m => m.ForumPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
