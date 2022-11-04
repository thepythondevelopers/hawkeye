import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient, private router: Router) { }
  signup(req:any){
    this.http.post('http://localhost:5000/register',(req)).subscribe((res:any)=>{
      alert(res.msg);
      if(res.msg==="registration successfull"){
        this.router.navigate(['/login']);
      }
    })

    }
  }
