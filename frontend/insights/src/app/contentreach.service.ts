import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentreachService {
  feed: any;

  constructor(private http: HttpClient) { }
  rp(access_token:any,media_id:any){
    let media_reach= 'https://graph.facebook.com/v15.0/'+media_id+'/insights?metric=reach&access_token='+access_token;
    return this.http.get(media_reach);
  }
}
