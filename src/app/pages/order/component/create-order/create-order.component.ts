import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services';
import {routes} from '../../../../consts';
import {ToastrService} from "ngx-toastr";
import {Order} from "../../models/order";
import {MatTableDataSource} from "@angular/material/table";
import {CreateBannerComponent} from "../../../banner/component/create-banner/create-banner.component";
import {MatDialog} from "@angular/material/dialog";
import {EditOrderDetailComponent} from "../edit-order-detail/edit-order-detail.component";

@Component({
    selector: 'app-create-order',
    templateUrl: './create-order.component.html',
    styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

    res: any
    categories: any = []
    id: any;
    public routes: typeof routes = routes;
    public orderInfo: Order;
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns: string[] = ['previewUrl', 'name', 'game', 'price', 'quantity', 'amount', 'statusName', 'action'];
    disableButton: boolean;

    constructor(
        private orderService: OrderService,
        private _route: ActivatedRoute,
        protected toastrService: ToastrService,
        private formBuilder: FormBuilder,
        private matDialog: MatDialog
    ) {
    }

    categoryForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: [''],
        parentCategoryId: [0, [Validators.required]],
    })

    ngOnInit(): void {
        if (localStorage.getItem("orderId") !== "0")
            this.id = localStorage.getItem("orderId");
        else
            this.id = this._route.snapshot.params["id"];

        this.findOrder();
    }

    hasValue() {
        return Object['values'](this.categoryForm.value).join('').length > 0
    }

    onConfirmOrder(type) {
        let message = '';
        console.log(this.orderInfo.status)
        let messStatus = this.orderInfo.status === 'Thành công' ? "Đơn hàng đã xác nhận thành công! " : ""
        type === "3" ? message = messStatus + "Bạn muốn xác nhận đơn hàng thành công?" : message = messStatus + "Bạn muốn huỷ đơn hàng?";
        if (type === "3") {
            let checkFinish = true;
            let checkSuccess = false;
            this.orderInfo.orderDetailList.forEach(detail => {
                if (detail.status === '' || detail.status === '0' || detail.status === null)
                    checkFinish = false;
                if (detail.status === '1')
                    checkSuccess = true;
            });
            if (!checkFinish || !checkSuccess) {
                this.toastrService.error("Bạn phải thực hiện xác nhận thành công các gói hàng mới có thể xác nhận thành công order!")
                return;
            }
        } else {
            let checkFinish = true;
            this.orderInfo.orderDetailList.forEach(detail => {
                if (detail.status === '1')
                    checkFinish = false;
            })
            if (!checkFinish) {
                this.toastrService.error("Bạn đã xác nhận hết các gói hàng! Hiện không thể huỷ đơn hàng!")
                return;
            }
        }

        if (confirm(message)) {
            let totalAmount = 0;
            this.orderInfo.orderDetailList.forEach(detail => {
                if (detail.status === '1')
                    totalAmount = totalAmount + detail.amount;
            })
            let object = {
                orderId: this.id,
                status: type,
                totalAmount: totalAmount
            }
            this.orderService.updateOrder(object).subscribe(data => {
                if (type === "3") {
                    this.orderInfo.status = "Thành công";
                } else if (type === "4") {
                    this.orderInfo.status = "Huỷ";
                }
                this.disableButton = true;
                this.toastrService.success('Update trạng thái order thành công');

            })
        }
    }

    findOrder() {
        if (this.id !== 0 && this.id !== null) {
            let res: any;
            this.orderService.getOrder(this.id).subscribe(data => {
                this.orderInfo = data;
                if (this.orderInfo.status === "1") {
                    this.orderInfo.status = "Chờ xử lý";
                } else if (this.orderInfo.status === "2") {
                    this.orderInfo.status = "Đang xử lý";
                } else if (this.orderInfo.status === "3") {
                    this.orderInfo.status = "Thành công";
                } else if (this.orderInfo.status === "4") {
                    this.orderInfo.status = "Huỷ";
                    this.disableButton = true;
                }
                let temp = data['orderDetailList'];
                temp.forEach(order => {
                    if (order.status === "" || order.status === "0") {
                        order.statusName = "Chờ xử lý";
                    } else if (order.status === "1") {
                        order.statusName = "Thành công";
                    }
                    if (order.status === "2") {
                        order.statusName = "Huỷ";
                    }
                })
                this.dataSource.data = temp;
            })
        } else {
            this.id = 0;
        }
    }

    openConfirmDialog(orderDetail) {
        this.matDialog.open(EditOrderDetailComponent, {
            width: '1550px',
            height: '680px',
            data: {
                orderDetail: orderDetail,
                phoneNumber: this.orderInfo.phoneNumber,
                customerName: this.orderInfo.customerName,
                email: this.orderInfo.email
            }
        })
            .afterClosed()
            .subscribe(shouldReload => {
                window.location.reload()
            });
    }
}
