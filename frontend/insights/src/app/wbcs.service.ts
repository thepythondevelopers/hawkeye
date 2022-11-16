import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WbcsService {

  constructor(private http: HttpClient) { }

  wc_week(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000);
    let since = until-(7*24*60*60);
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
  wc_week_p(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000)-(7*24*60*60);
    let since = until-(7*24*60*60);
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
  wc_30(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000);
    let since = until-(30*24*60*60);
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
  wc_30_p(access_token:any,ig_id:any){
    var len, i,wcs=0;
    let now = new Date();
    let until = Math.floor(now.getTime() / 1000)-(30*24*60*60);
    let since = until-(30*24*60*60);
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
  wc_calender(access_token:any,ig_id:any,date:any,period:any){
    var len, i,wcs=0;
    let since=0;
    let until=0;
    if(period==="month"){
      until = Math.floor(new Date(date).getTime() / 1000);
      since = until-(30*24*60*60);
      console.log("for month=","start date=",since,"end date=",until);
    }
    else if(period==="week"){
      until = Math.floor(new Date(date).getTime() / 1000);
      since = until-(7*24*60*60);
      console.log("for week=","start date=",since,"end date=",until);
    }
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
  wc_calender_p(access_token:any,ig_id:any,date:any,period:any){
    var len, i,wcs=0;
    let since=0;
    let until=0;
    if(period==="month"){
      until = Math.floor(new Date(date).getTime() / 1000)-(30*24*60*60);
      since = until-(30*24*60*60);
      console.log("for month=","start date=",since,"end date=",until);
    }
    else if(period==="week"){
      until = Math.floor(new Date(date).getTime() / 1000)-(7*24*60*60);
      since = until-(7*24*60*60);
      console.log("for week=","start date=",since,"end date=",until);
    }
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
}
