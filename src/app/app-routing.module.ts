import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';
import { CreateGameComponent } from './pages/games/components/create-game/create-game.component';
import { EditUserComponent } from './pages/tables/components/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent
  },
  // {
  //   path: 'typography',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/typography/typography.module').then(m => m.TypographyModule)
  // },
  {
    path: 'users',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'users/edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: EditUserComponent
  },
  {
    path: 'games',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule)
  },
  {
    path: 'packages',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/packages/package.module').then(m => m.PackageModule)
  },
  {
    path: 'games/create',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateGameComponent
  },
  // {
  //   path: 'notification',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule)
  // },
  {
    path: 'ui',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/ui-elements/ui-elements.module').then(m => m.UiElementsModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
