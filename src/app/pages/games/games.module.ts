import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GamesPageComponent } from './containers';
import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { GamesService } from './services';
import { ListGameComponent } from './components/list-game/list-game.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  providers: [
    GamesService
  ]
})
export class GamesModule { }
