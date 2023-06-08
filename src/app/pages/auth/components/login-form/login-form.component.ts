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
            password: new FormControl('', [Validators.required])
        });
        this.login()
    }

    public login() {
        if (this.form.valid) {
            this.authService.login(this.form.value).subscribe(data => {
                if (data['data']['roles'][0] == 'ROLE_ADMIN') {
                    localStorage.setItem('token', data['data']['token']);
                    localStorage.setItem('cGFzc3dvcmQ', btoa("ADMIN TRUNG BET"));
                    alert("Chào mừng admin!")
                    this.router.navigate([this.routers.TABLES]).then();
                } else {
                    localStorage.setItem('token', null);
                }
            })
        }

    }
}
