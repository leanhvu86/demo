import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

import {AppSetting} from "../../../appsetting";
import {OrderDetail} from "../models/orderDetail";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    };

    BASE_SERVER_URL = AppSetting.BASE_SERVER_URL;

    getListOrder(pageNumber: Number,
                 pageSize: Number, code: String,
                 orderBy: String): Observable<Order[]> {
        return this.http.get<Order[]>(this.BASE_SERVER_URL + `/api/orders?code=${code}&orderBy=${orderBy}&orderType=asc&pageSize=${pageSize}&pageNumber=${pageNumber}`);
    }

    updateOrder(status: any): Observable<Order[]> {
        return this.http.post<Order[]>(this.BASE_SERVER_URL + '/api/orders/update/status', status);
    }

    updateOrderDetail(orderDetail: any): Observable<Order[]> {
        return this.http.post<OrderDetail[]>(this.BASE_SERVER_URL + '/api/orders/update/order-detail/status', orderDetail);
    }

    getOrder(id: number): Observable<any> {
        return this.http.get<Order[]>(this.BASE_SERVER_URL + '/api/orders/detail/' + id);
    }

    deleteOrder(id: any): Observable<Order[]> {
        let params = new HttpParams().set('id', id);
        return this.http.get<Order[]>(this.BASE_SERVER_URL + '/api/Order', {params: params});
    }
}
