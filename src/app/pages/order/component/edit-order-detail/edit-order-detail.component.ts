import {Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services';
import {routes} from '../../../../consts';
import {ToastrService} from "ngx-toastr";
import {Order} from "../../models/order";
import {MatTableDataSource} from "@angular/material/table";
import {CreateBannerComponent} from "../../../banner/component/create-banner/create-banner.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-edit-order-detail',
    templateUrl: './edit-order-detail.component.html',
    styleUrls: ['./edit-order-detail.component.scss']
})
export class EditOrderDetailComponent implements OnInit {

    res: any
    categories: any = []
    id: number = 0;
    public routes: typeof routes = routes;
    disableButton: boolean;
    customerName: string = '';
    phoneNumber: string = '';
    email: string = '';
    gameName: string = '';
    packageName: string = '';
    categoryName: string = '';
    checkOrder: boolean = true;

    constructor(
        private orderService: OrderService,
        private _route: ActivatedRoute,
        protected toastrService: ToastrService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.customerName = data.customerName;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
        this.gameName = data.orderDetail.game.name;
        this.packageName = data.orderDetail.gamePackage.name;
        this.categoryName = data.orderDetail.gameCategories.name;
    }

    categoryForm: FormGroup = this.formBuilder.group({
        id: [0],
        account: [''],
        amount: [0],
        server: [''],
        characterName: [''],
        loginCode: [''],
        loginType: [''],
        password: [''],
        price: [0],
        quantity: [0],
        status: [''],
        gameId: [0],
        packageId: [0],
        description: [''],
    })

    ngOnInit(): void {
        this.id = this._route.snapshot.params["id"];
        this.categoryForm = new FormGroup({
            id: new FormControl(this.data.orderDetail.id),
            account: new FormControl(this.data.orderDetail.account),
            amount: new FormControl(this.data.orderDetail.amount),
            server: new FormControl(this.data.orderDetail.server),
            characterName: new FormControl(this.data.orderDetail.characterName),
            loginCode: new FormControl(this.data.orderDetail.loginCode),
            loginType: new FormControl(this.data.orderDetail.loginType),
            password: new FormControl(this.data.orderDetail.password),
            price: new FormControl(this.data.orderDetail.price),
            quantity: new FormControl(this.data.orderDetail.quantity),
            status: new FormControl(this.data.orderDetail.status),
            gameId: new FormControl(this.data.orderDetail.gameId),
            packageId: new FormControl(this.data.orderDetail.packageId),
            description: new FormControl(this.data.orderDetail.description),
        })
    }

    hasValue() {
        return Object['values'](this.categoryForm.value).join('').length > 0
    }

    changeQuantity() {
        if(this.categoryForm.controls['quantity'].value<1){
            this.toastrService.error("Số lượng phải lớn hơn 0!");
            return;
        }
        let amount = this.categoryForm.controls['quantity'].value * this.categoryForm.controls['price'].value;

        this.categoryForm.patchValue({
            amount: amount
        });

    }


    onUpdateAccountInfo() {
        this.checkOrder = false;
    }


    onConfirmOrder() {
        if (this.categoryForm.value['status'] === null || this.categoryForm.value['status'] === "0") {
            this.toastrService.error("Vui lòng xác nhận trạng thái gói!");
            return;
        }
        if(this.categoryForm.controls['quantity'].value<1){
            this.toastrService.error("Số lượng phải lớn hơn 0!");
            return;
        }
        if (confirm("Bạn muốn xác nhận gói?")) {
            this.checkOrder = true;
            this.orderService.updateOrderDetail(this.categoryForm.value).subscribe(data => {
                this.checkOrder = false;
                this.toastrService.success('Update trạng thái gói thành công');
            })
        }
    }
}
