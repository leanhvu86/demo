import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Games } from '../models/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { };
  // Add Authentication to Header
  api_key = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MDE0NTExNCwiZXhwIjoxNjgwMjMxNTE0fQ.qRlKAic6DvKn69nW-DpqSAOGTze6XQUBT2LwourGAKP3O1h6ySbZYRsqEMQcs3Mc8FduSfILk-CW9rnWD33OvA";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.api_key}`,
    "Access-Control-Allow-Origin": '*'
  });
  requestOptions = { headers: this.headers };

  uploadFile(data:any): Observable<any> {
    return this.http.post<any>('http://52.41.255.157:8080/trunggame-0.0.1/api/file/upload', data, this.requestOptions);
  }

  getListGame(): Observable<Games[]> {
    return this.http.get<Games[]>('http://52.41.255.157:8080/trunggame-0.0.1/api/games', this.requestOptions);
  }

  createGame(data:Games[]): Observable<Games[]> {
    return this.http.post<Games[]>('http://52.41.255.157:8080/trunggame-0.0.1/api/games', data, this.requestOptions);
  }

  getListCategory(): Observable<any> {
    return this.http.get<any>('http://52.41.255.157:8080/trunggame-0.0.1/api/category/list', this.requestOptions);
  }

}
