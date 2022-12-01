import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkout_service(req:any){
    return this.http.post(environment.baseURL+"/create-checkout-session",({"price_id":req}));
  }
}
