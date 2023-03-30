import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
// import { Users } from '../../models/users';
import { TablesService } from '../../services';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  constructor(private tableService: TablesService) {
  }

  // user: Users[] = [];

  @Input() userTableData: [];
  public displayedColumns: string[] = ['select', 'username', 'email', 'fullName', 'address', 'phoneNumber', 'roles', 'status', 'action'];
  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);

  allData: any
  activeData: any
  public isShowFilterInput = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnInit(): void {
    this.getUser()
    this.dataSource.paginator = this.paginator;
  }

  getUser() {
    this.tableService.getListUser().subscribe( data => {
      this.dataSource.data = data['data']['content']
      console.log(this.dataSource.data)
    })
  }

  onDelete(id:number){
    
    if(confirm("Xac nhan xoa")) {
      this.tableService.deleteUser(({
        ids: [id]
      })).subscribe(data => {
        this.tableService.getListUser().subscribe(data => {
          this.dataSource.data = data['data']['content']
        })
      })
    }
    console.log(({
      ids: [id]
    }))
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public applyFilter(event: Event): void {
    this.getUser()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.getUser()
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<any>(this.userTableData);
  }

}
