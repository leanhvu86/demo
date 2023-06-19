import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Email } from '../models';
import {Games} from "../../games/models/games";
import {HttpClient} from "@angular/common/http";
import {AppSetting} from "../../../appsetting";
import {Order} from "../../order/models/order";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) { };

  BASE_SERVER_URL= AppSetting.BASE_SERVER_URL;

  public loadEmails(): Observable<Email[]> {


  }
}
