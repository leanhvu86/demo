import { Component, EventEmitter, Input, Output } from '@angular/core';

import { routes } from '../../../../consts';
import { User } from '../../../../pages/auth/models';
import {EditOrderDetailComponent} from "../../../../pages/order/component/edit-order-detail/edit-order-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../pages/auth/services";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail: string = "https://flatlogic.com";
  constructor(
              private router: Router) {
  };
  public signOutEmit(): void {
    this.signOut.emit();
  }
  onChangePass() {
    this.router.navigate([this.routes.PASSWORD]).then();
  }
}
