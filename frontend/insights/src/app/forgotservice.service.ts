import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotserviceService {

  constructor(private http : HttpClient, private router : Router) { }
  Forgot(req:any){
    this.http.post(environment.baseURL+'/forgot_email',(req)).subscribe((res:any)=>{
      alert(res.msg);
      if(res.msg==="Login Successfull"){
        localStorage.setItem("email",req.email);
        this.router.navigate(['/dashboard']);
      }
      else{
        alert("Login Unsuccessfull");
      }
    })

    }
}
