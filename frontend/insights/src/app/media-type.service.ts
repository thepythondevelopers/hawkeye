import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaTypeService {
  feed: any;
  constructor(private http: HttpClient) { }
  mt(access_token:any,media_id:any){
    let media_product_type = 'https://graph.facebook.com/v15.0/'+media_id+'?fields=media_product_type&access_token='+access_token;
    return this.http.get(media_product_type);
  }
}
