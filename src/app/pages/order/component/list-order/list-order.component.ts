import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {routes} from '../../../../consts';
import {OrderService} from '../../services';
import {Order} from "../../models/order";

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

    public routes: typeof routes = routes;
    parentCate: any = []
    @Input() OrderData: [];
    public displayedColumns: string[] = [ 'code', 'customerName','createdAt','updatedAt', 'totalAmount', 'status', 'action'];
    public dataSource = new MatTableDataSource<any>();
    public selection = new SelectionModel<any>(true, []);
    public orderBy = 'status';
    public isShowFilterInput = false;

    totalData = 0;
    pageSizes = [10, 20, 30];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private orderService: OrderService) {
        localStorage.setItem("orderId", "0");
    }

    ngOnInit(): void {
        this.getAllOrder("")
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    setPage($event: PageEvent) {
        this.paginator.pageIndex= $event.pageIndex;
        this.getAllOrder("");
    }

    getAllOrder(code:any) {
        let pageNumber = 0;
        let pageSize = 10;
        if (this.paginator.pageIndex !== undefined) pageNumber = this.paginator.pageIndex;
        if (this.paginator.pageSize !== undefined) pageSize = this.paginator.pageSize;
        // console.log(this.paginator.pageIndex)
        this.orderService.getListOrder(pageNumber, pageSize,code, this.orderBy).subscribe((data) => {
            // console.log(data)
            this.totalData = data['totalData'];
            // this.paginator.pageIndex=data['pageNumber'];
            // this.paginator.pageSize=data['pageSize'];
            let orderList= data['orderList'];
            orderList.forEach(order => {
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
            // this.dataSource.data = orderList;
            this.dataSource = new MatTableDataSource<Order>(orderList);
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
        console.log((event.target as HTMLInputElement).value)
        this.getAllOrder((event.target as HTMLInputElement).value);
    }

    public showFilterInput(): void {
        this.getAllOrder("")
        this.isShowFilterInput = !this.isShowFilterInput;
        this.dataSource = new MatTableDataSource<any>(this.OrderData);
    }


}
