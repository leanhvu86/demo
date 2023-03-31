import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Customer, Employee } from '../models';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient) { };
  api_key = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MDIzMTgzMCwiZXhwIjoxNjgwMzE4MjMwfQ.Q3R5cnkF0iOeSt06_gUslDIQgjtQJ2JE6TtxKZ9k34OE0uwjrrT6h29rtsMQuL03pVH5exMdnEk35rX-1jNFbA";
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.api_key}`
  });
  requestOptions = { headers: this.headers };

  getListUser(): Observable<Users[]> {
    return this.http.get<Users[]>('http://52.41.255.157:8080/trunggame-0.0.1/api/user', this.requestOptions);
  }

  updateUser(data: any): Observable<Users[]> {
    return this.http.post<Users[]>('http://52.41.255.157:8080/trunggame-0.0.1/api/user/update', data, this.requestOptions);
  }

  deleteUser(id:any): Observable<Users[]> {
    return this.http.post<Users[]>('http://52.41.255.157:8080/trunggame-0.0.1/api/user/delete', id, this.requestOptions);
  }

  // ================================
  public loadEmployeeTableData(): Observable<Employee[]> {
    return of([
      { name: 'Joe James', company: 'Example Inc.', city: 'Yonkers', state: 'NY' },
      { name: 'John Walsh', company: 'Example Inc.', city: 'Hartford', state: 'CT' },
      { name: 'Bob Herm', company: 'Example Inc.', city: 'Tampa', state: 'FL' },
      { name: 'James Houston', company: 'Example Inc.', city: 'Dallas', state: 'TX' },
      { name: 'Prabhakar Linwood', company: 'Example Inc.', city: 'Hartford', state: 'CT' },
      { name: 'Kaui Ignace', company: 'Example Inc.', city: 'Yonkers', state: 'NY' },
      { name: 'Esperanza Susanne', company: 'Example Inc.', city: 'Hartford', state: 'CT' },
      { name: 'Christian Birgitte', company: 'Example Inc.', city: 'Tampa', state: 'FL' },
      { name: 'Meral Elias', company: 'Example Inc.', city: 'Hartford', state: 'CT' },
      { name: 'Deep Pau', company: 'Example Inc.', city: 'Yonkers', state: 'NY' },
      { name: 'Sebastiana Hani', company: 'Example Inc.', city: 'Dallas', state: 'TX' },
      { name: 'Marciano Oihana', company: 'Example Inc.', city: 'Yonkers', state: 'NY' },
      { name: 'Brigid Ankur', company: 'Example Inc.', city: 'Dallas', state: 'TX' },
      { name: 'Anna Siranush', company: 'Example Inc.', city: 'Yonkers', state: 'NY' },
      { name: 'Avram Sylva', company: 'Example Inc.', city: 'Hartford', state: 'CT' },
      { name: 'Serafima Babatunde', company: 'Example Inc.', city: 'Tampa', state: 'FL' },
      { name: 'Gaston Festus', company: 'Example Inc.', city: 'Tampa', state: 'FL' }
    ]);
  }

  // public loadUserTableData(): Observable<Users[]> {
  //   return of([
  //     {
  //       username: 'tvquang',
  //       email: 'tvquang@gmail.com',
  //       password: '123455',
  //       name: 'Trần Văn Quang',
  //       address: '465 Đội Cấn',
  //       city: 'Hà Nội',
  //       country: 'Việt Nam',
  //       postal_code: '112121',
  //       about: '',
  //       avatar: '',
  //       role: 'admin',
  //       status: 'active'
  //     },
  //     {
  //       username: 'tvquang',
  //       email: 'tvquang@gmail.com',
  //       password: '123455',
  //       name: 'Trần Văn Quang',
  //       address: '465 Đội Cấn',
  //       city: 'Hà Nội',
  //       country: 'Việt Nam',
  //       postal_code: '112121',
  //       about: '',
  //       avatar: '',
  //       role: 'admin',
  //       status: 'stop'
  //     }
  //   ]);
  // }

  public loadMaterialTableData(): Observable<Customer[]> {
    return of([
      {
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'send'
      },
      {
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'send'
      },
      {
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'pending'
      },
      {
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'declined'
      },
      {
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: 'Let\'s Dance',
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'send'
      }
    ]);
  }
}
