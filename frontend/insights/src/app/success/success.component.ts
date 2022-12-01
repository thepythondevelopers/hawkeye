import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentListService } from '../payment-list.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css','../login-with-facebook/login-with-facebook.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private http : HttpClient,private router : Router, private payment_list:PaymentListService) {
    this.http.post(environment.baseURL+'/get_plans',{"email":localStorage.getItem('email')}).subscribe((response)=>{
      let my_plan = Object.entries(response)[0][1];
      if(my_plan==='Null'){
        this.payment_list.list().subscribe((res:any)=>{
          let customer=res.data[0].customer;
          //console.log("customer=",customer)
          this.payment_list.customer_details(customer).subscribe((resp:any)=>{
          let email=resp.email;
          console.log("email",email);
          let amount=res.data[0].amount_received;
          //console.log("amount=",amount);
          let creation_date=res.data[0].created;
          //console.log("creation_date=",creation_date);
          let description=res.data[0].description;
          //console.log("description=",description);
          let status=res.data[0].status;
          //console.log("status=",status);
          let date=new Date();
          let latest_date_in_unix=Math.floor(date.getTime() / 1000);
          //console.log("latest date=",latest_date_in_unix);
          if(amount===1900||amount===2400||amount===3400 && description==='Subscription creation' && status==="succeeded" && email===localStorage.getItem('email')){
            if((latest_date_in_unix-creation_date)<2678400){
              this.payment_list.save_subscription({"amount":amount,"email":email}).subscribe((res)=>{
                console.log("suscription susccessfull")
              });
            }
            else{
              alert('Please Buy a plan first');
              this.router.navigate(['/pricing']);
            }
          }
          })
        })
      }
    })
  }

  ngOnInit(): void {
  }
  connect_to_fb(){
    this.router.navigate(['/login-with-facebook']); 
  }
}
