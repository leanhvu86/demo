import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GamesPageComponent } from './containers';
import { CreateGameComponent } from './components/create-game/create-game.component';

const routes: Routes = [
  {
    path: '',
    component: GamesPageComponent
  },
  {
    path: 'create',
    component: CreateGameComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class GamesRoutingModule {
}
