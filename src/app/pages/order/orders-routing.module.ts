import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OrderPageComponent } from './containers';
import { CreateOrderComponent } from './component/create-order/create-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent
  },
  {
    path: 'create',
    component: CreateOrderComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class OrdersRoutingModule {
}
