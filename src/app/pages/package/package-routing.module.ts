import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PackagePageComponent } from './containers';
import { CreatePackageComponent } from './component/create-package/create-package.component';

const routes: Routes = [
  {
    path: '',
    component: PackagePageComponent
  },
  {
    path: 'create',
    component: CreatePackageComponent
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
