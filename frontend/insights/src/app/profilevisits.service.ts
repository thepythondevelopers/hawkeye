import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfilevisitsService {

  constructor(private http: HttpClient, private router : Router) { }
  profile_Visits(access_token:any,ig_id:any){
    let url='https://graph.facebook.com/v15.0/'+ig_id+'/insights?metric=profile_views&period=day&access_token='+access_token;
    this.http.get(url).subscribe((res)=>{
    //console.log(Object.entries(res)[0][1][0]);
    let len = Object.entries(res)[0][1][0]["values"].length;
    //console.log(len);
    var i,prv=0;
    for(i=0;i<len;i++){
      prv = prv + Object.entries(res)[0][1][0]["values"][i].value;
    }
    console.log("profile visits = ",prv);
    });
  }
}