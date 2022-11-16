import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowersDetailsService {

  constructor(private http: HttpClient) { }

  city(access_token:any,ig_id:any){
    let url='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=audience_city&period=lifetime&access_token='+access_token;
    return this.http.get(url);
  }
  gender_age(access_token:any,ig_id:any){
    let url='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=audience_gender_age&period=lifetime&access_token='+access_token;
    return this.http.get(url);
  }
  country(access_token:any,ig_id:any){
    let url='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=audience_country&period=lifetime&access_token='+access_token;
    return this.http.get(url);
  }
}
