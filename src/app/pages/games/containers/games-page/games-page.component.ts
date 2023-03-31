import { Component } from '@angular/core';
import { Games } from '../../models/games';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent {

  public routes: typeof routes = routes;

  private collection: Games[] = [];
}
