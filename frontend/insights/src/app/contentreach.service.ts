import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentreachService {
  feed: any;

  constructor(private http: HttpClient) { }
  rp(access_token:any,ig_id:any){
    let media_product_type = 'https://graph.facebook.com/v15.0/' + ig_id + '?fields=media_product_type&access_token='+access_token;
    return this.http.get(media_product_type);
  }
}
