import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {

  constructor(private http: HttpClient) { }

  new_post_week(access_token:any,ig_id:any){
    let np_url='https://graph.facebook.com/v8.0/'+ig_id+'/media?fields=like_count,timestamp&limit=36500000&access_token='+access_token;
    return this.http.get(np_url);
  }
}
