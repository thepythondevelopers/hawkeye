import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private router : Router, private login : LoginService) {
    /*if(localStorage.getItem("jwt")){
      this.router.navigate(['/login-with-facebook']);
    }*/
    if(localStorage.getItem("email")){
      this.router.navigate(['/login-with-facebook']);
    }
   }
  logindata(data:any){
    if(data.email && data.password)
    this.login.Login(data);
    else{
      if(!data.email)
      alert("Email Cannot be Empty");  
      if(!data.password)
      alert("Password Cannot be empty");
    } 
  }
  ngOnInit(): void {
  }

}
