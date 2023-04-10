import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CategoriesPageComponent } from './containers';
import { CreateCategoryComponent } from './component/create-category/create-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent
  },
  {
    path: 'create',
    component: CreateCategoryComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CategoriesRoutingModule {
}
