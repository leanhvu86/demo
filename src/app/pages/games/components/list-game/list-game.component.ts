import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { routes } from '../../../../consts';
import { GamesService } from '../../services';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.scss']
})
export class ListGameComponent implements OnInit {

  public routes: typeof routes = routes;

  constructor(private gameService: GamesService) {
  }

  // user: Users[] = [];

  @Input() userTableData: [];
  public displayedColumns: string[] = ['select', 'name', 'price', 'promotionPercent', 'thumbnail', 'type', 'categoryName', 'status', 'action'];
  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<Users>(this.userTableData);
    this.getGame()
    this.dataSource.paginator = this.paginator;
    console.log(routes.CREATE_GAMES)
  }

  getGame() {
    this.gameService.getListGame().pipe().subscribe( data => {
      // console.log(data)
      this.dataSource.data = data['data']
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
    this.getGame()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.getGame()
    this.isShowFilterInput = !this.isShowFilterInput;
    this.dataSource = new MatTableDataSource<any>(this.userTableData);
  }

}
