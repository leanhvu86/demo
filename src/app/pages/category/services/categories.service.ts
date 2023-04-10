import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/categories';

import {AppSetting} from "../../../appsetting";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { };

  BASE_SERVER_URL= AppSetting.BASE_SERVER_URL;

  getListCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_SERVER_URL+'/api/category/list');
  }

  createCategory(data: any): Observable<Category[]> {
    return this.http.post<Category[]>(this.BASE_SERVER_URL+'/api/category', data);
  }

  updateCategory(data: any): Observable<Category[]> {
    return this.http.post<Category[]>(this.BASE_SERVER_URL+'/api/category/update', data);
  }

  deleteCategory(id:any): Observable<Category[]> {
    let params = new HttpParams().set('id', id);
    return this.http.get<Category[]>(this.BASE_SERVER_URL+'/api/category', { params: params });
  }
}
