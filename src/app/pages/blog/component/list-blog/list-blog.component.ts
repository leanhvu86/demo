import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { routes } from '../../../../consts';
import { BlogService } from '../../services';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {

  public routes: typeof routes = routes;
  @Input() blogData: [];
  public displayedColumns: string[] = ['select', 'title', 'author', 'imageUrl', 'link','status', 'action'];
  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getAllBlog();
    this.dataSource.paginator = this.paginator;
  }

  getAllBlog() {
    this.blogService.getListBlog().subscribe(data => {
      this.dataSource.data = data['data'];
    })
  }

  // onDelete(id: number) {
  //   if (confirm("Xac nhan xoa")) {
  //     this.blogService.deleteBlog(id).subscribe(data => {
  //       this.getAllBlog()
  //     })
  //   }
  // }


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
    this.getAllBlog();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.getAllBlog();
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<any>(this.blogData);
  }

}
