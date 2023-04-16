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
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';

import {GamesPageComponent} from './containers';
import {GamesRoutingModule} from './games-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {GamesService} from './services';
import {ListGameComponent} from './components/list-game/list-game.component';
import {CreateGameComponent} from './components/create-game/create-game.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {CKEditorModule} from "ckeditor4-angular";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        GamesPageComponent,
        ListGameComponent,
        CreateGameComponent
    ],
    imports: [
        CommonModule,
        GamesRoutingModule,
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
        FormsModule
    ],
    providers: [
        GamesService,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {floatLabel: 'always'},
        }
    ]
})
export class GamesModule {
}
