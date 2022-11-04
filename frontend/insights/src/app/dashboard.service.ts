import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  reach_day: any;
  reach_day_28: any;

  constructor(private http: HttpClient, private router : Router) { }
  reach_week(access_token:any,ig_id:any){
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=week&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
  reach_30(access_token:any,ig_id:any){
    let now = new Date();
    let timestampInMs = now.getTime();
    let until = Math.floor(now.getTime() / 1000);
    let since = until-(30*24*60*60);
    let url_30='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_30);
  }
  reach_30p(access_token:any,ig_id:any){
    let now = new Date();
    let timestampInMs = now.getTime();
    let until = Math.floor(now.getTime() / 1000)-(24*60*60);
    let since = until-(30*24*60*60);
    let url_30='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_30);
  }
}
