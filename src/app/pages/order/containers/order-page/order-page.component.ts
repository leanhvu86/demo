import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-categories-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent {

  public routes: typeof routes = routes;

  private collection: Order[] = [];
}
