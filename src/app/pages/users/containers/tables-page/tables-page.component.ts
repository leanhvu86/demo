import { Component } from '@angular/core';
import { Observable, Subscription  } from 'rxjs';

import { UsersService } from '../../services';
import { Customer, Employee } from '../../models';
import { Users } from '../../models/users';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent {

  private collection: Users[] = [];

  public employeeTableData$: Observable<Employee[]>
  public materialTableData$: Observable<Customer[]>
  // public userTableData$: Observable<Users[]>

  constructor(private service: UsersService) {
    this.employeeTableData$ = service.loadEmployeeTableData();
    this.materialTableData$ = service.loadMaterialTableData();
    // this.userTableData$ = service.getListUser();
  }
}
