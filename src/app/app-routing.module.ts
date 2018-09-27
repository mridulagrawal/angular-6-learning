import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent
            }
        ]
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
        // ,
        // children: [
        //     {
        //         path: ':id/:name',
        //         component: UserComponent
        //     }
        // ]
    }
    ,
    // {
    //     path: 'servers',
    //     component: ServersComponent,
    //     // canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     children: [
    //         {
    //             path: ':id/edit',
    //             component: EditServerComponent,
    //             canDeactivate: [CanDeactivateGuard]
    //         },
    //         {
    //             path: ':id',
    //             component: ServerComponent
    //         }
    //     ]
    // },
    // {
    //     path: 'not-found',
    //     component: PageNotFoundComponent
    // },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
