import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { routes } from '../../../../consts';
import { CategoriesService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  public routes: typeof routes = routes;
  parentCate: any = []
  @Input() categoryData: [];
  public displayedColumns: string[] = ['select', 'name', 'description', 'parentName', 'status', 'action'];
  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private categoriesService: CategoriesService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategory()
    this.dataSource.paginator = this.paginator;
  }

  getAllCategory() {
    this.categoriesService.getListCategory().subscribe(data => {

      // this.parentCate = data['data'].filter(item => item['parentId'] == 0)
      this.dataSource.data = data['data']
      this.dataSource.data.forEach(element1 => {
        if (element1.parentId == 0) {
          element1.parentName = ""
        } else {
          element1.parentName = this.dataSource.data.find(d => d['id'] === element1.parentId)['name']
        }
      });
    })
  }

  onDelete(id: number) {
    if (confirm("Xac nhan xoa")) {
      this.categoriesService.deleteCategory(id).subscribe(data => {
        this.getAllCategory()
      })
    }
  }
  openCreateDialog() {
    this.matDialog.open(CreateCategoryComponent, {
      width: '550px',
      height: '500px'
    })
    .afterClosed()
    .subscribe(shouldReload => {
      window.location.reload()
    });
  }

  openEditDialog(id : number) {
    this.matDialog.open(CreateCategoryComponent, {
      width: '550px',
      height: '500px',
      data: id
    })
    .afterClosed()
    .subscribe(shouldReload => {
      window.location.reload()
    });
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
    this.getAllCategory()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.getAllCategory()
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<any>(this.categoryData);
  }

}
