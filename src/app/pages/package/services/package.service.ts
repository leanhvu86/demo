import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/package';

import {AppSetting} from "../../../appsetting";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { };

  BASE_SERVER_URL= AppSetting.BASE_SERVER_URL;

  url = 'http://localhost:3002/packages/'
  url2 = 'http://localhost:3002/server/'
  getListPackage(): Observable<Package[]> {
    // return this.http.get<Package[]>(this.BASE_SERVER_URL+'/api/category/list');
    return this.http.get<Package[]>(this.url);
  }

  createPackage(data: any): Observable<Package[]> {
    return this.http.post<Package[]>(this.url, data);
  }

  updatePackage(id:number, data:any): Observable<any> {
    return this.http.put<any>(this.url + id, data);
  }

  deletePackage(id:number): Observable<any> {
    return this.http.delete<any>(this.url+id);
  }

  createServer(data : any): Observable<any> {
    return this.http.post<any>(this.url2, data);
  }

}
