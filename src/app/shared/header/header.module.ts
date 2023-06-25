import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';

import {HeaderComponent} from './containers';
import {EmailComponent, UserComponent} from './components';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {SearchComponent} from './components/search/search.component';
import {ShortNamePipe} from './pipes';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        HeaderComponent,
        UserComponent,
        EmailComponent,
        NotificationsComponent,
        SearchComponent,
        ShortNamePipe
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatInputModule,
        MatBadgeModule,
        RouterModule,
        MatCardModule,
        ReactiveFormsModule
    ]
})
export class HeaderModule {
}
