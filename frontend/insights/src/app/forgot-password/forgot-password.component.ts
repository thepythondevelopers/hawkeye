import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotserviceService } from '../forgotservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router : Router, private forgot : ForgotserviceService){
    if(localStorage.getItem("jwt")){
      this.router.navigate(['/dashboard']);
    }
   }

  forgotemail(data:any){
    if(data.email)
    this.forgot.Forgot(data);
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
