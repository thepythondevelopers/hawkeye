import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient, private router : Router) { }
  Login(req:any){
    this.http.post('http://localhost:5000/login',(req)).subscribe((res:any)=>{
      if(res.msg==="Login Successfull"){
        alert(res.msg);
        //localStorage.setItem("jwt",res.jwt);
        localStorage.setItem("email",req.email);
        this.router.navigate(['/login-with-facebook']);
      }
      else{
        alert("Login Unsuccessfull");
      }
    })

    }
  }
