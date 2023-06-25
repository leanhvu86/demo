import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {ToastrService} from "ngx-toastr";
import {routes} from '../../../../consts';
import {Router} from '@angular/router';
import {AppSetting} from "../../../../appsetting";


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    @Output() sendLoginForm = new EventEmitter<void>();
    public form: FormGroup;
    public routers: typeof routes = routes;
    public deployTIme = AppSetting.DEPLOY_TIME;

    constructor(private http: HttpClient,
                private authService: AuthService,
                protected toastrService: ToastrService,
                private router: Router) {
    };

    public ngOnInit(): void {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            secretKey: new FormControl('', [Validators.required])
        });
        this.login()
    }

    public login() {
        if (this.form.valid) {
            let secret='TRUNGGAME-dse234343-663454c3-2359-4109-a13d-204f6022a4d1';
            if (this.form.controls['secretKey'].value !== secret) {
                this.toastrService.error('Bạn phải điền đúng secrect key để đăng nhập trang Admin!', 'Lỗi');
                return;
            }
            this.authService.login(this.form.value).subscribe(data => {
                if (data['data']['roles'][0] == 'ROLE_ADMIN') {
                    localStorage.setItem('token', data['data']['token']);
                    localStorage.setItem('cGFzc3dvcmQ', btoa("ADMIN TRUNG BET"));
                    localStorage.setItem('secretKey', secret);
                    localStorage.setItem('username', this.form.controls['username'].value);
                    alert("Chào mừng admin!")
                    this.router.navigate([this.routers.TABLES]).then();
                } else {
                    localStorage.setItem('token', null);
                }
            })
        }

    }
}
