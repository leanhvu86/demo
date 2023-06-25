import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard/containers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {AuthGuard} from './pages/auth/guards';
import { CreateGameComponent } from './pages/games/components/create-game/create-game.component';

import { EditUserComponent } from './pages/users/components/edit-user/edit-user.component';
import { CreateCategoryComponent } from './pages/category/component/create-category/create-category.component';
import { CreatePackageComponent } from './pages/package/component/create-package/create-package.component';
import { CreateBlogComponent } from './pages/blog/component/create-blog/create-blog.component';
import {OrdersModule} from "./pages/order/orders.module";
import {CreateOrderComponent} from "./pages/order/component/create-order/create-order.component";
import {PasswordComponent} from "./shared/password/password.component";

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent
  },
  {
    path: 'users',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
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
    path: 'games/create',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateGameComponent
  },
  {
    path: 'games/edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateGameComponent
  },
  {
    path: 'categories',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/category/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'categories/create',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateCategoryComponent
  },
  {
    path: 'categories/edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateCategoryComponent
  },
  {
    path: 'order',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/order/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'order/edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateOrderComponent
  },
  {
    path: 'password',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PasswordComponent
  },
  {
    path: 'package',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/package/package.module').then(m => m.PackageModule)
  },
  {
    path: 'package/create',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreatePackageComponent
  },
  {
    path: 'package/edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreatePackageComponent
  },
  {
    path: 'blog',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'blog/create',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateBlogComponent
  },
  {
    path: 'blog/edit/:id',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CreateBlogComponent
  },
  {
    path: 'banner',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/banner/banner.module').then(m => m.BannerModule)
  },
  // {
  //   path: 'banner/create',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   component: CreateBlogComponent
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
