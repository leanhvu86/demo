import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Banner} from '../models/banner';

import {AppSetting} from "../../../appsetting";
import {Games} from "../../games/models/games";

@Injectable({
    providedIn: 'root'
})
export class BannerService {

    constructor(private http: HttpClient) {
    };

    BASE_SERVER_URL = AppSetting.BASE_SERVER_URL;

    getListBanner(): Observable<Banner[]> {
        return this.http.get<Banner[]>(this.BASE_SERVER_URL + '/api/banners');
    }

    createBanner(data: Banner[]): Observable<Banner[]> {
        return this.http.post<Banner[]>(this.BASE_SERVER_URL + '/api/banners', data);
    }

    updateBanner(type: number, data: any): Observable<Banner[]> {
        return this.http.post<Banner[]>(this.BASE_SERVER_URL + '/api/banners/update/' + type, data);
    }

    deleteBanner(type: number, data: any): Observable<Banner[]> {
        return this.http.post<Banner[]>(this.BASE_SERVER_URL + '/api/banners/delete/' + type, data);
    }

    changeLevel(id: number): Observable<Banner[]> {
        return this.http.post<Banner[]>(this.BASE_SERVER_URL + '/api/banners/up/' + id, {});
    }

    uploadFile(data: any): Observable<any> {
        return this.http.post<any>(this.BASE_SERVER_URL + '/api/file/upload', data);
    }

}
