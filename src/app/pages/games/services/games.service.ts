import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Games } from '../models/games';
import {AppSetting} from "../../../appsetting";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { };
  // Add Authentication to Header
  // api_key = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImlhdCI6MTY4MDM1NzQyMiwiZXhwIjoxNjgwNDQzODIyfQ.eeRrMbearD3XA3OM63aI1ZcC0jCZAUEPGnofdrwLkJAFGvUSRgV1EjkI9cCfrLvo3wn9YrM0iG2088eQh0AJaw";
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${this.api_key}`,
  //   "Access-Control-Allow-Origin": '*'
  // });
  // requestOptions = { headers: this.headers };
  BASE_SERVER_URL= AppSetting.BASE_SERVER_URL;

  uploadFile(data:any): Observable<any> {
    return this.http.post<any>(this.BASE_SERVER_URL+'/api/file/upload', data);
  }

  getListGame(): Observable<Games[]> {
    return this.http.get<Games[]>(this.BASE_SERVER_URL+'/api/games');
  }

  createGame(data:Games[]): Observable<Games[]> {
    return this.http.post<Games[]>(this. BASE_SERVER_URL+'/api/games', data);
  }

  getListCategory(): Observable<any> {
    return this.http.get<any>(this.BASE_SERVER_URL+'/api/category/list');
  }

}
