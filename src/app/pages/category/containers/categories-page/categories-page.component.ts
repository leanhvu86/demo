import { Component } from '@angular/core';
import { Category } from '../../models/categories';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent {

  public routes: typeof routes = routes;

  private collection: Category[] = [];
}
