import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from '../models/banner';

import {AppSetting} from "../../../appsetting";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { };

  BASE_SERVER_URL= AppSetting.BASE_SERVER_URL;

  getListBanner(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.BASE_SERVER_URL+'/api/file/banner');
  }

  uploadFile(data:any): Observable<any> {
    return this.http.post<any>(this.BASE_SERVER_URL+'/api/file/upload', data);
  }

}
