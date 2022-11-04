import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImpressionService {

  constructor(private http: HttpClient, private router : Router) { }
  impressions_week(access_token:any,ig_id:any){
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=impressions&period=week&access_token='+access_token;
    return this.http.get(url_week);
  }
  impressions_30(access_token:any,ig_id:any){
    let now = new Date();
    let timestampInMs = now.getTime();
    let until = Math.floor(now.getTime() / 1000);
    let since = until-(30*24*60*60);
    let url_30='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=impressions&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    return this.http.get(url_30);
  }
  impressions_30p(access_token:any,ig_id:any){
    let now = new Date();
    let timestampInMs = now.getTime();
    let until = Math.floor(now.getTime() / 1000)-(24*60*60);
    let since = until-(30*24*60*60);
    let url_30='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=impressions&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    return this.http.get(url_30);
  }
}
