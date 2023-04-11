import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { routes } from '../../../../consts';
import { PackageService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
// import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-list-package',
  templateUrl: './list-package.component.html',
  styleUrls: ['./list-package.component.scss']
})
export class ListPackageComponent implements OnInit {

  public routes: typeof routes = routes;
  parentCate: any = []
  @Input() categoryData: [];
  public displayedColumns: string[] = ['select', 'name', 'price', 'unit', 'rating', 'server_group', 'server', 'attribute', 'warehouse_quantity', 'trade_count', 'description_vi', 'description_en', 'delivery_time', 'action'];
  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private packageService: PackageService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPackage()
    this.dataSource.paginator = this.paginator;
  }

  getAllPackage() {
    this.packageService.getListPackage().subscribe(data => {
      this.dataSource.data = data
      console.log(this.dataSource.data)
    })
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
    this.getAllPackage()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.getAllPackage()
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<any>(this.categoryData);
  }

}
