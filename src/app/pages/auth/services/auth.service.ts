import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { routes } from '../../../consts';
import { Router } from '@angular/router';

import { User } from '../models';
import { AppSetting } from 'src/app/appsetting';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  a = '1'
  public routers: typeof routes = routes;
  constructor(private http: HttpClient, private router: Router) { };

  BASE_SERVER_URL= AppSetting.BASE_SERVER_URL;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('')
  });

  public login(data: any): Observable<any> {
    return this.http.post<any>(this.BASE_SERVER_URL+'/api/auth/signin', data);
  }

  public sign(): void {
    localStorage.setItem('token', 'token');
  }

  public signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('secretKey');
  }

  public getUser(): Observable<User> {
    let username = localStorage.getItem('username');

    return of({
      name: username,
      lastName: ''
    });
  }
}
