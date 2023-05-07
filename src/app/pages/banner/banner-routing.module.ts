import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BannerPageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: BannerPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class BannerRoutingModule {
}
