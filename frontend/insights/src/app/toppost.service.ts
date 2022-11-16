import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToppostService {
  
  constructor(private http: HttpClient) {}
  top(access_token:any,ig_id:any){
    let now = new Date();
    let limit = Math.floor(now.getTime() / 1000);
    let tl_url='https://graph.facebook.com/v8.0/'+ig_id+'/media?fields=like_count,comments_count,caption,timestamp,permalink&limit='+limit+'&access_token='+access_token;
    return this.http.get(tl_url);
  }
  top2(access_token:any,ig_id:any){
    let now = new Date();
    let limit = Math.floor(now.getTime() / 1000);
    let tl_url='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=reach,saved&access_token='+access_token;
    return this.http.get(tl_url);
  }
}
