import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {routes} from '../../consts';
import {User} from '../../pages/auth/models';
import {EditOrderDetailComponent} from "../../pages/order/component/edit-order-detail/edit-order-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../pages/users/services";

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

    passwordForm: FormGroup;
    updatePassword: false;
    show: boolean = false;
    passwordType = 'password';
    public routes: typeof routes = routes;

    constructor(protected toastrService: ToastrService,
                private formbuilder: FormBuilder,
                private userService: UsersService,
                private router: Router,
                private _route: ActivatedRoute) {
        this.passwordForm = this.formbuilder.group({
            password: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        });
    }


    ngOnInit(): void {
    }

    onUpdatePassword() {
        console.log(this.passwordForm.value);
        if (this.passwordForm.valid) {
            if (this.passwordForm.controls['newPassword'].value !== this.passwordForm.controls['confirmPassword'].value) {
                this.toastrService.error('Mật khẩu nhập lại phải trùng khớp!', 'Lỗi');
                return;
            }
            let object = {
                username: localStorage.getItem('username'),
                password: this.passwordForm.controls['password'].value,
                newPassword: this.passwordForm.controls['newPassword'].value
            }
            this.userService.changePassword(({
                username: localStorage.getItem('username'),
                password: this.passwordForm.controls['password'].value,
                newPassword: this.passwordForm.controls['newPassword'].value
            })).subscribe(data => {
                console.log(data);
                if (data['status'] === 200) {
                    this.toastrService.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại', '');
                    localStorage.removeItem('token');
                    localStorage.removeItem('secretKey');
                    localStorage.removeItem('username');
                    this.router.navigate([this.routes.LOGIN]).then();
                }else{
                    this.toastrService.error('Đổi mật khẩu không thành công!', 'Lỗi');
                }
            })
        }
    }

    onClick() {
        if (this.passwordType === 'password') {
            this.passwordType = 'text';
            this.show = true;
        } else {
            this.passwordType = 'password';
            this.show = false;
        }
    }
}
