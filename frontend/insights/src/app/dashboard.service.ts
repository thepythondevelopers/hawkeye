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
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000);
    let since = until-(7*24*60*60);
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
  reach_week_p(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000)-(7*24*60*60);
    let since = until-(7*24*60*60);
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
  reach_30(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000);
    let since = until-(30*24*60*60);
    let url_30='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_30);
  }
  reach_30p(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000)-(30*24*60*60);
    let since = until-(30*24*60*60);
    let url_30='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_30);
  }
  reach_calender(access_token:any,ig_id:any,date:any,period:any){
    var len, i,wcs=0;
    let until = new Date(date).getTime() / 1000;
    let since=0;
    if(period==="month"){
      since = until-(30*24*60*60);
    }
    else if(period==="week"){
      since = until-(7*24*60*60);
    }
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
  reach_calender_p(access_token:any,ig_id:any,date:any,period:any){
    var len, i,wcs=0;
    let since=0;
    let until=0;
    if(period==="month"){
      until = (new Date(date).getTime() / 1000)-(30*24*60*60);
      since = until-(30*24*60*60);
      console.log("for month=","start date=",since,"end date=",until);
    }
    else if(period==="week"){
      until = (new Date(date).getTime() / 1000)-(7*24*60*60);
      since = until-(7*24*60*60);
      console.log("for week=","start date=",since,"end date=",until);
    }
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
  imp_calender(access_token:any,ig_id:any,date:any,period:any){
    var len, i,wcs=0;
    let until = new Date(date).getTime() / 1000;
    let since=0;
    if(period==="month"){
      since = until-(30*24*60*60);
    }
    else if(period==="week"){
      since = until-(7*24*60*60);
    }
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=impressions&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
  imp_calender_p(access_token:any,ig_id:any,date:any,period:any){
    var len, i,wcs=0;
    let since=0;
    let until=0;
    if(period==="month"){
      until = (new Date(date).getTime() / 1000)-(30*24*60*60);
      since = until-(30*24*60*60);
      console.log("for month=","start date=",since,"end date=",until);
    }
    else if(period==="week"){
      until = (new Date(date).getTime() / 1000)-(7*24*60*60);
      since = until-(7*24*60*60);
      console.log("for week=","start date=",since,"end date=",until);
    }
    let url_week='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=impressions&period=day&since='+since+'&until='+until+'&access_token='+access_token;
    //let url_day_28='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach&period=days_28&access_token='+access_token;
    return this.http.get(url_week);
  }
}
