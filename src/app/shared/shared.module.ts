import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderModule } from './header/header.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsMenuComponent } from './ui-elements';
import { DateMenuComponent } from './ui-elements';
import { LayoutComponent } from './layout/layout.component';
import {AlertDialog, ConfirmationDialog} from "./service/system.service";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    SettingsMenuComponent,
    DateMenuComponent,
    LayoutComponent,
    ConfirmationDialog,
    AlertDialog
  ],
  imports: [
    HeaderModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatDialogModule
  ],
  exports: [
    HeaderModule,
    SidebarComponent,
    FooterComponent,
    SettingsMenuComponent,
    DateMenuComponent,
    LayoutComponent,
    ConfirmationDialog,
    AlertDialog
  ]
})
export class SharedModule { }
