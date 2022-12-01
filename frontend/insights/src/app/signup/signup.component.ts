import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router : Router, private signup : SignupService) { 
    if(localStorage.getItem("email")){
      this.router.navigate(['/dashboard']);
    }
  }
  signupdata(data:any){
    this.signup.signup(data);
  }
  ngOnInit(): void {
  }
}
