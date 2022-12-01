import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient, private router: Router) { }
  signup(req:any){
    console.log('request from signup',req);
    this.http.post(environment.baseURL+'/register',(req)).subscribe((res:any)=>{
      alert(res.msg);
      if(res.msg==="registration successfull"){
        this.router.navigate(['/login']);
      }
    })

    }
  }
