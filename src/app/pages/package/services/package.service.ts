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

  url = 'http://localhost:3002/packages'
  getListPackage(): Observable<Package[]> {
    // return this.http.get<Package[]>(this.BASE_SERVER_URL+'/api/category/list');
    return this.http.get<Package[]>(this.url);
  }
}
