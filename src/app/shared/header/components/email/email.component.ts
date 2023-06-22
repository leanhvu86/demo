import {Component, Input, OnInit} from '@angular/core';
import {routes} from '../../../../consts';
import {Email} from '../../../../pages/auth/models';
import {Order} from "../../../../pages/order/models/order";
import {HttpClient} from "@angular/common/http";
import {AppSetting} from "../../../../appsetting";
import {Router} from "@angular/router";

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
    emails: Email[];
    public routes: typeof routes = routes;

    constructor(private http: HttpClient, private router: Router,
    ) {
    };

    BASE_SERVER_URL = AppSetting.BASE_SERVER_URL;

    loadData() {
        this.http.get<Order[]>(this.BASE_SERVER_URL + '/api/orders/check-order').subscribe(data => {
            this.emails = data;
        })
    }

    public colors: string[] = [
        'yellow',
        'green',
        'blue',
        'ping'
    ];

    reload(id) {
        this.router.navigate(['/order/edit/' + id]).then(() => {
            window.localStorage.setItem("orderId",id);
            window.location.reload();
        });
    }

    ngOnInit(): void {
        this.loadData();
    }
}
