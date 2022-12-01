import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { ProfileImageService } from '../profile-image.service';

@Component({
  selector: 'app-login-with-facebook',
  templateUrl: './login-with-facebook.component.html',
  styleUrls: ['./login-with-facebook.component.css']
})
export class LoginWithFacebookComponent implements OnInit {
  user:any;
  loggedIn:any;
  authtoken:any;
  access_token: any;
  ig_id: any;

  constructor(private pis: ProfileImageService,private http: HttpClient, private router : Router, private authService: SocialAuthService,) {
    /*if(!localStorage.getItem("jwt")){
      this.router.navigate(['/signup']);
    }
    else{
      if(localStorage.getItem("auth_token")){
        this.router.navigate(['/dashboard']);  
      }
    }*/
    if(!localStorage.getItem("email")){
      this.router.navigate(['/signup']);
    }
    else{
      if(localStorage.getItem("auth_token")){
        this.router.navigate(['/dashboard']);  
      }
    }
   }

   ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.authtoken=user.authToken;
      console.log("User=",user.authToken);
      localStorage.setItem("auth_token",user.authToken);
      this.loggedIn = (user != null);
      this.access_token_and_ig_id(this.authtoken);
    });
  }
  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement'
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions);
  }
  access_token_and_ig_id(auth_token : any) {
    let url='https://graph.facebook.com/v8.0/me/accounts?fields=access_token,instagram_business_account{id}&access_token='+auth_token;
    this.http.get(url).subscribe((res:any)=>{
      this.access_token=res.data[0].access_token;
      this.ig_id=res.data[0].instagram_business_account.id;
      localStorage.setItem("access_token",this.access_token);
      let url2='https://graph.facebook.com/v15.0/'+this.ig_id+'?fields=profile_picture_url&access_token='+this.access_token;
      this.http.get(url2).subscribe((resp:any)=>{
        let profile_image=resp.profile_picture_url;
        this.pis.set_image(profile_image).subscribe((response)=>{

        })
      })
      localStorage.setItem("ig_id",this.ig_id);
      this.router.navigate(['/dashboard']);
    });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/signup']);
  }
}
