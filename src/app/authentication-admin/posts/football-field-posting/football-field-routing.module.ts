import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballFieldPostingPage } from './football-field-posting.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: FootballFieldPostingPage,
        children: [
            {
                path: 'post',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
                    }
                ]
            },
            {
                path: 'edit',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
                    },
                    {
                        path: 'edit-post/:fieldId',
                        loadChildren: () => import('./edit/edit-post/edit-post.module').then( m => m.EditPostPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: './football-field-posting/tabs/post',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: './football-field-posting/tabs/post',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FootballFieldRoutingModule {}