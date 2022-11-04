import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TotalfollowersService {

  constructor(private http: HttpClient, private router : Router) { }
    totalfollowers(access_token:any,ig_id:any){
    let tf_url='https://graph.facebook.com/v15.0/'+ig_id+'?fields=followers_count&access_token='+access_token;
    return this.http.get(tf_url);
  }
}