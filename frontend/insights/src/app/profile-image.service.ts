import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  constructor(private http: HttpClient) { }
  set_image(pi:any){
    return this.http.post(environment.baseURL+'/set-profile-image',({"profile_image":pi,"email":localStorage.getItem("email")}))
  }
  get_profile_image(){
    return this.http.post(environment.baseURL+'/set-profile-image',({"email":localStorage.getItem("email")}))
  }
}
