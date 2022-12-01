import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
@Injectable()
export class PricingComponent implements OnInit {

  constructor(private http: HttpClient,private router : Router,private checkout: CheckoutService) { 

  }

  ngOnInit(): void {
    if(!localStorage.getItem('email')){
      this.router.navigate(['/login'])
    }
  }

  freelancer_package(data:any) {
    if(localStorage.getItem('email')){
      console.log("freelancer checkout button working fine");
      this.checkout.checkout_service(data).subscribe((res)=>{
        console.log("checkout response",res);
        window.location.href =<any>[Object.entries(res)[42][1]];
      });
    }
  }
}
