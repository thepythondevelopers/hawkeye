import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup'
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private toast:NgToastService, private http : HttpClient, private router : Router) { }
  Login(req:any){
    this.http.post(environment.baseURL+'/login',(req)).subscribe((res:any)=>{
      if(res.msg==="Login Successfull"){
        this.toast.success({detail:"Success Message",summary:res.msg,duration:5000});
        //localStorage.setItem("jwt",res.jwt);
        localStorage.setItem("email",req.email);
        this.router.navigate(['/pricing']);
      }
      else{
        console.log(res);
      }
    },(error: any) => {
      console.log(error);
      if(error.status ==400){
        this.toast.error({detail:"Failure Message",summary:"Invalid Email Or Password",duration:5000});
      }
    })

    }
  }
