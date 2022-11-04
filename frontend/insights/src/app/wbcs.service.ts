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
    let day = 0;
    let since = until-(7*24*60*60);
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=website_clicks&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
}
