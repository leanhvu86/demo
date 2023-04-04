import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PackagesPageComponent} from "./containers/packages-page/packages-page.component";
import {CreatePackagesComponent} from "./component/create-packages/create-packages.component";


const routes: Routes = [
  {
    path: '',
    component: PackagesPageComponent
  }
  ,
  {
    path: 'create',
    component: CreatePackagesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PackageRoutingModule {
}
