import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  constructor(private http: HttpClient) { }

  list(){
    let url=environment.baseURL+'/payment_lists';
    return this.http.get(url);
  }
  customer_details(req:any){
    return this.http.post(environment.baseURL+'/customer_details',({"customer":req}));
  }
  save_subscription(req:any){
    return this.http.post(environment.baseURL+'/save_subscription',({"amount":req.amount,"email":req.email}));
  }
}
