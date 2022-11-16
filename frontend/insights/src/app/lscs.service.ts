import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LscsService {

  constructor(private http: HttpClient, private router : Router) { }
  shared(access_token:any,media_id:any){
    let url='https://graph.facebook.com/v15.0/'+media_id+'/insights?metric=shares&access_token='+access_token;
    return this.http.get(url);
  }
  saved(access_token:any,media_id:any){
    let url='https://graph.facebook.com/v15.0/'+media_id+'/insights?metric=saved&access_token='+access_token;
    return this.http.get(url);
  }
  like(access_token:any,ig_id:any){
    let now = new Date();
    let limit = Math.floor(now.getTime() / 1000);
    let tl_url='https://graph.facebook.com/v8.0/'+ig_id+'/media?fields=like_count&limit='+limit+'&access_token='+access_token;
    return this.http.get(tl_url);
  }
  comment(access_token:any,ig_id:any){
    let now = new Date();
    let limit = Math.floor(now.getTime() / 1000);
    let tc_url='https://graph.facebook.com/v8.0/'+ig_id+'/media?fields=comments_count&limit='+limit+'&access_token='+access_token;
    return this.http.get(tc_url);
  }
}