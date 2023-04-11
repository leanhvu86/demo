import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PackagePageComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: PackagePageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PackageRoutingModule {
}
