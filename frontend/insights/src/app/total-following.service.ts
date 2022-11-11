import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalFollowingService {

  constructor(private http: HttpClient) { }

  tfollowing(access_token:any,ig_id:any){
    return this.http.get('https://graph.facebook.com/v15.0/'+ig_id+'?fields=follows_count%2Cid%2Cusername%2Cwebsite&access_token='+access_token)
  }
}
