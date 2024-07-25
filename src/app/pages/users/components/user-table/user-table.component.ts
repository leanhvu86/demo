import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {routes} from '../../../../consts';
import {UsersService} from '../../services';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

    public routes: typeof routes = routes;
    @Input() userTableData: [];
    public displayedColumns: string[] = ['select', 'username', 'fullName', 'address', 'phoneNumber', 'roles', 'status', 'action'];
    public dataSource = new MatTableDataSource<any>();
    public selection = new SelectionModel<any>(true, []);

    public isShowFilterInput = false;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private tableService: UsersService) {
    }

    public ngOnInit(): void {
        this.getAllUser()
        this.dataSource.paginator = this.paginator;
    }

    getUser() {
        this.tableService.getListUser().subscribe(data => {
            this.dataSource.data = data['data']['content'].filter(item => item['status'] !== "DELETED")
        })
    }

    getAllUser() {
        this.tableService.getListUser().subscribe(data => {
            this.dataSource.data = data['data']['content']
        })
    }

    getDeletedUser() {
        this.tableService.getListUser().subscribe(data => {
            this.dataSource.data = data['data']['content'].filter(item => item['status'] === "DELETED")
        })
    }

    onChangeStatus(element: any) {

        if (confirm("Xac nhận mở khoá acount này?")) {
            this.tableService.activeUser(({
                ids: [element.id]
            })).subscribe(data => {
                this.getAllUser()
            })
        }
    }

    onDeleteUser(element: any) {

        if (confirm("Xac nhan block acount này?")) {
            this.tableService.deleteUser(({
                ids: [element.id]
            })).subscribe(data => {
                this.getAllUser()
            })
        }
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
