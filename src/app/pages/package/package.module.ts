import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';

import { PackagePageComponent } from './containers';
import { PackageRoutingModule } from './package-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {CKEditorModule} from "ckeditor4-angular";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { PackageService } from './services';
import { ListPackageComponent } from './component/list-package/list-package.component';
import { CreatePackageComponent } from './component/create-package/create-package.component';
import { ServerComponent } from './component/server/server.component';
import {UiElementsModule} from "../ui-elements/ui-elements.module";

@NgModule({
  declarations: [
    PackagePageComponent,
    ListPackageComponent,
    CreatePackageComponent,
    ServerComponent
  ],
    imports: [
        CommonModule,
        PackageRoutingModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatFormFieldModule,
        SharedModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTabsModule,
        MatRadioModule,
        CKEditorModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatSelectModule,
        FormsModule,
        MatDialogModule,
        UiElementsModule
    ],
  providers: [
    PackageService,

]
})
export class PackageModule { }
