import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BlogPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class BlogRoutingModule {
}
