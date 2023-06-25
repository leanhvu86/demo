import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {routes} from '../../../../consts';
import {OrderService} from '../../services';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

    public routes: typeof routes = routes;
    parentCate: any = []
    @Input() OrderData: [];
    public displayedColumns: string[] = ['select', 'code', 'customerName','createdAt','updatedAt', 'totalAmount', 'status', 'action'];
    public dataSource = new MatTableDataSource<any>();
    public selection = new SelectionModel<any>(true, []);
    public orderBy = 'status';
    public isShowFilterInput = false;

    totalData = 0;
    pageSizes = [5, 10, 15];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private orderService: OrderService) {
        localStorage.setItem("orderId", "0");
    }

    ngOnInit(): void {
        this.getAllOrder()
        this.dataSource.paginator = this.paginator;
    }

    getAllOrder() {
        let pageNumber = 0;
        let pageSize = 10;
        if (this.paginator.pageIndex !== undefined) pageNumber = this.paginator.pageIndex;
        if (this.paginator.pageSize !== undefined) pageSize = this.paginator.pageSize;
        this.orderService.getListOrder(pageNumber, pageSize, this.orderBy).subscribe((data) => {
            this.totalData = data.length;
            data.forEach(order => {
                if (order.status === "1") {
                    order.status = "Chờ xử lý";
                } else if (order.status === "2") {
                    order.status = "Đang xử lý";
                } else if (order.status === "3") {
                    order.status = "Thành công";
                } else if (order.status === "4") {
                    order.status = "Huỷ";
                }
                // 1 - cho xu ly, 2 - dang xu ly, 3 - thanh cong , 4 - Huỷ
            })
            // this.parentCate = data['data'].filter(item => item['parentId'] == 0)
            this.dataSource.data = data;

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
        this.getAllOrder()
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public showFilterInput(): void {
        this.getAllOrder()
        this.isShowFilterInput = !this.isShowFilterInput;
        this.dataSource = new MatTableDataSource<any>(this.OrderData);
    }

}
