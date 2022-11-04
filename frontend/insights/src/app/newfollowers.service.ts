import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewfollowersService {

  constructor(private http: HttpClient) { }

  nf(access_token:any,ig_id:any){
    let date = new Date();
    let until = Math.floor(date.getTime() / 1000);
    let since = until-(24*60*60*30);
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'/insights?&metric=follower_count&period=day&since='+since+'&until='+until+'&access_token='+access_token);
  }
}
