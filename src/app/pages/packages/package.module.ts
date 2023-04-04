import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesPageComponent } from './containers/packages-page/packages-page.component';
import { ListPackagesComponent } from './component/list-packages/list-packages.component';
import { CreatePackagesComponent } from './component/create-packages/create-packages.component';
import {SharedModule} from "../../shared/shared.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {RouterModule} from "@angular/router";
import {PackageRoutingModule} from "./package-routing.module";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    PackagesPageComponent,
    ListPackagesComponent,
    CreatePackagesComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        MatAutocompleteModule,
        RouterModule,
        PackageRoutingModule,
        MatInputModule
    ]
})

export class PackageModule { }
