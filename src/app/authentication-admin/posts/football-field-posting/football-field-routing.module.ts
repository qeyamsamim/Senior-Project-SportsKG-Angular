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
                        loadChildren: './post/post.module#PostPageModule'
                    }
                ]
            },
            {
                path: 'edit',
                children: [
                    {
                        path: '',
                        loadChildren: './edit/edit.module#EditPageModule'
                    },
                    {
                        path: 'edit-post/:fieldId',
                        loadChildren: './edit/edit-post/edit-post.module#EditPostPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/football-field-posting/tabs/post',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/football-field-posting/tabs/post',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FootballFieldRoutingModule {}