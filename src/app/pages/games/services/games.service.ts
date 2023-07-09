import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Games} from '../models/games';
import {AppSetting} from "../../../appsetting";
import {Companies} from "../models/companies";
import {MarketTypes} from "../models/marketTypes";

@Injectable({
    providedIn: 'root'
})
export class GamesService {

    constructor(private http: HttpClient) {
    };

    BASE_SERVER_URL = AppSetting.BASE_SERVER_URL;

    uploadFile(data: any): Observable<any> {
        return this.http.post<any>(this.BASE_SERVER_URL + '/api/file/upload', data);
    }

    getListGame(): Observable<Games[]> {
        return this.http.get<Games[]>(this.BASE_SERVER_URL + '/api/games');
    }

    createGame(data: Games[]): Observable<Games[]> {
        return this.http.post<Games[]>(this.BASE_SERVER_URL + '/api/games', data);
    }

    deleteFile(data: any): Observable<any> {
        return this.http.post<any>(this.BASE_SERVER_URL + '/api/file/delete/'+data,null);
    }

    getListCategory(): Observable<any> {
        return this.http.get<any>(this.BASE_SERVER_URL + '/api/category/list');
    }

    getGame(id: number): Observable<any> {
        return this.http.get<Games[]>(this.BASE_SERVER_URL + '/api/games/' + id);
    }

    updateGame(data: Games[]): Observable<Games[]> {
        return this.http.post<Games[]>(this.BASE_SERVER_URL + '/api/games/update', data);
    }

    deleteGame(object: any): Observable<any> {
        return this.http.post<Games[]>(this.BASE_SERVER_URL + '/api/games/delete', object);
    }

    getCompanies(): Observable<any> {
        return this.http.get<Companies[]>(this.BASE_SERVER_URL + '/api/companies');
    }

    getMarketTypes(): Observable<any> {
        return this.http.get<MarketTypes[]>(this.BASE_SERVER_URL + '/api/marketTypes');
    }
}
