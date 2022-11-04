import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Chart,ChartConfiguration} from 'node_modules/chart.js';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { ContentreachService } from '../contentreach.service';
import { DashboardService } from '../dashboard.service';
import { FollowersDetailsService } from '../followers-details.service';
import { ImpressionService } from '../impression.service';
import { LscsService } from '../lscs.service';
import { MediaidService } from '../mediaid.service';
import { NewfollowersService } from '../newfollowers.service';
import { NewpostService } from '../newpost.service';
import { ProfilevisitsService } from '../profilevisits.service';
import { ToppostService } from '../toppost.service';
import { TotalfollowersService } from '../totalfollowers.service';
import { WbcsService } from '../wbcs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  toDisplay = false;
  toDisplay1 = false;
  toDisplay3 = false;
  res_id:any;
  user:any;
  authtoken:any;
  loggedIn:any;
  access_token: any;
  ig_id: any;
  Reach_day: any;
  Reach_week: any;
  impressions_day: any;
  impressions_week: any;
  imp_percentage_change: any;
  reach_percentage_change: any;
  total_followers: any;
  tf_inc_30: any;
  total_likes: any;
  toDisplay_reach_period=false;
  Reach_weekp: any;
  toDisplay_reach_period_30= false;
  toDisplay_reach_period_week= true;
  toDisplay_imp_period_week= true;
  toDisplay_imp_period= false;
  impressions_weekp: any;
  Reach_30: any;
  Reach_30p: any;
  toDisplay_imp_period_30=false;
  impressions_30: any;
  impressions_30p: any;
  imp_30p: any;
  wcs: any;
  wcs_week: any;

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }
  toggleData1() {
    this.toDisplay1 = !this.toDisplay1;
  }
  toggleData3() {
    this.toDisplay3 = !this.toDisplay3;
  }
  select_reach_period() {
    this.toDisplay_reach_period = !this.toDisplay_reach_period;
  }
  select_imp_period() {
    this.toDisplay_imp_period = !this.toDisplay_imp_period;
  }

  lineChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets:[
      {
        data:[89,34,43,54,28,74,93],
        label: 'Sales Percentage',
        borderColor: '#E07001',
        tension: 0.5,
        pointBackgroundColor: '#ffff',
        pointBorderColor: '#E07001',
        backgroundColor: '#E07001'
      }
    ]
  }

  lineChartOptions ={
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    } 
  }

  lineChartData2 = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets:[
      {
        data:[89,34,43,54,28,74,93],
        label: 'Sales Percentage',
        borderColor: '#E07001',
        tension: 0.5,
        pointBackgroundColor: '#ffff',
        pointBorderColor: '#E07001',
        backgroundColor: '#E07001'
      }
    ]
  }

  lineChartOptions2 ={
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    } 
  }

  barChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets:[
      {
        data:[89,34,43,54,28,74,93],
        label: 'Sales Percentage',
        backgroundColor: '#613DC1'
      }
    ]
  }

  barChartOptions ={
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    } 
  }

  doughnutChartData = {
    datasets:[
      {
        data:[89,34,43,54,28,74,93],
        label: 'Sales Percentage',
        backgroundColor: [
          '#3B00ED',
          '#9C27B0',
          '#D81B60',
          '#FF9800',
          '#C0CA33',
          'black',
          'red'
        ],
        cutout: "80%"
      }
    ],
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  }

  constructor(private authService: SocialAuthService, private http: HttpClient,private router: Router,private reach_service : ContentreachService,private newpost : NewpostService,private toppost : ToppostService, private newfollowers : NewfollowersService, private wbcs : WbcsService, private dashboardservice: DashboardService, private impservice: ImpressionService, private fd_service : FollowersDetailsService, private lscs_service : LscsService,  private tfs : TotalfollowersService, private prfvisits : ProfilevisitsService ) { 
    /*if(!localStorage.getItem("jwt")){
      this.router.navigate(['/signup']);
    }
    else{
      if(!localStorage.getItem("auth_token")){
        this.router.navigate(['/login-with-facebook']);
      }
      else{
        alert("dynamic data in dashboard");
        if(localStorage.getItem("access_token")){
          this.access_token=localStorage.getItem("access_token");
          this.ig_id=localStorage.getItem("ig_id");
          this.reach28();
          this.imp_week();
          this.tf();
          this.lscs();
        }
      }
    }*/
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
    this.reach_week();
    this.imp_week();
    this.tf();
    this.lscs();
    this.wbc_week();
  }
  ngOnInit() {
    /*this.authService.authState.subscribe((user) => {
      this.user = user;
      this.authtoken=user.authToken;
      console.log("User=",user.authToken);
      this.loggedIn = (user != null);
      this.access_token_and_ig_id(this.authtoken);
    });*/
  }
  run(){
    alert("run");
  }
  myFunction(){
    alert("working");
  }
  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement'
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions);
  }
  reach30(){
    this.toDisplay_reach_period=false;
    this.toDisplay_reach_period_week=false;
    this.toDisplay_reach_period_30=true;
    this.dashboardservice.reach_30(this.access_token,this.ig_id).subscribe((res)=>{
      console.log(res);
      let i=0;
      this.Reach_30=0;
      for(i=0;i<30;i++){
        this.Reach_30=this.Reach_30+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 30 days",this.Reach_30);
    this.dashboardservice.reach_30p(this.access_token,this.ig_id).subscribe((res)=>{
      let i=0;
      this.Reach_30p=0;
      for(i=0;i<30;i++){
        this.Reach_30p=this.Reach_30p+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 30 days previous day",this.Reach_30p);
      this.reach_percentage_change=<any>(((this.Reach_30-this.Reach_30p)/this.Reach_30p)*100).toFixed(2);
      //console.log(this.reach_percentage_change);
      });
      });
  }
  reach_week(){
    this.toDisplay_reach_period=false;
    this.toDisplay_reach_period_30=false;
    this.toDisplay_reach_period_week=true;
    this.dashboardservice.reach_week(this.access_token,this.ig_id).subscribe((res)=>{
      this.Reach_week=Object.entries(res)[0][1][0].values[1].value;
      //console.log("Reach returned week",this.Reach_week);
    this.dashboardservice.reach_week(this.access_token,this.ig_id).subscribe((res)=>{
      this.Reach_weekp=Object.entries(res)[0][1][0].values[0].value;
      //console.log("Reach returned week_previous",this.Reach_weekp);
      this.reach_percentage_change=<any>(((this.Reach_week-this.Reach_weekp)/this.Reach_weekp)*100).toFixed(2);
      //console.log(this.percentage_change);
      });
      });
  }
  imp_30(){
    this.toDisplay_imp_period=false;
    this.toDisplay_imp_period_week=false;
    this.toDisplay_imp_period_30=true;
    this.impservice.impressions_30(this.access_token,this.ig_id).subscribe((res)=>{ 
      console.log(res);
      let i=0;
      this.impressions_30=0;
      for(i=0;i<30;i++){
        this.impressions_30=this.impressions_30+(Object.entries(res)[0][1][0].values[i].value);
      } 
      console.log("impressions returned days_30 = ",this.impressions_30);
      //console.log("Impressions returned week",this.impressions_week);
    this.impservice.impressions_30p(this.access_token,this.ig_id).subscribe((res)=>{
      this.impressions_30p=0;
      for(i=0;i<30;i++){
        this.impressions_30p=this.impressions_30p+(Object.entries(res)[0][1][0].values[i].value);
      } 
      console.log("Impressions returned days_30p",this.impressions_30p);
      this.imp_percentage_change=<any>(((this.impressions_30-this.impressions_30p)/this.impressions_30p)*100).toFixed(2);
      console.log(this.imp_percentage_change);
      });
      });
  }
  imp_week(){
    this.toDisplay_imp_period=false;
    this.toDisplay_imp_period_week=true;
    this.toDisplay_imp_period_30=false;
    this.impservice.impressions_week(this.access_token,this.ig_id).subscribe((res)=>{
      this.impressions_week = Object.entries(res)[0][1][0].values[1].value;
      console.log("impressions returned week = ",this.impressions_week);
    this.impservice.impressions_week(this.access_token,this.ig_id).subscribe((res)=>{
        this.impressions_weekp=Object.entries(res)[0][1][0].values[0].value;
        console.log("Impressions returned weekp",this.impressions_weekp);
        this.imp_percentage_change=<any>(((this.impressions_week-this.impressions_weekp)/this.impressions_weekp)*100).toFixed(2);
        console.log(this.imp_percentage_change);
        });
      });
  }
  tp(){
    this.http.get('https://graph.facebook.com/v8.0/17841437251182054/media?fields=like_count,period=month&limit=36500000&access_token=EAAJI21EvdxwBAIeJQCO9iRvGVK7AojlL7TI9JlvFzVSqDWQdWQP0fM0k2GWEmxVEHzFbS1NNkkoitZCz4TGZC8KVVWK1nwoVcmFdrcMxfuJup3ImH8AJ86FZB8vDmnNlzk4jQQaGyJK6A6pN3yq4hDSPJVFaeLUrEQ9nMK8pDxNZAZA5wRbMyjLWwAnuo5fW10rGuT3aR7UiUYoshV8Lm').subscribe((res:any)=>{
    console.log(res);
    let i=0;
    for(i=0;i<res.data.length;i++){
      this.toppost.top(res.data[i].id);
    }
    });
  }
  cr(){
    /*api : https://graph.facebook.com/v15.0/17958979106105032/insights?metric=reach&access_token=EAAJI21EvdxwBAGdIJoWFHcOokerpZBQD2iaJB08FVys4yDi7ZCRdMJbU3It2auPrZCcjYgSmlvvurUlb6l9ZC3ZBfgB49s1OUlNo1ZC3yZCL43hVcxFgdGNmmUOdZAGhxmA1n1xaFEu5FqfXJA0xEBbQYVcty8kiA13puBdr2rCYKvDDUONHAQt9
    this.mediaid.m_id().subscribe((res:any)=>{
      this.res_id=res;
      console.log(this.res_id.data[0]);
    });*/
  }
  np(){
    this.newpost.new_post();
  }
  tf(){
    this.tfs.totalfollowers(this.access_token,this.ig_id).subscribe((res)=>{
      this.total_followers = Object.entries(res)[0][1];
      /*let len = Object.entries(res)[0][1][0]["values"].length;
      //console.log(len);
      var i,impressions=0;
      for(i=0;i<len;i++){
        impressions = impressions + Object.entries(res)[0][1][0]["values"][i].value;
      }
      console.log("impressions = ",impressions);*/
      });
  }
  pv(){
    this.prfvisits.profile_Visits(this.access_token,this.ig_id);
  }
  lscs(){
    this.lscs_service.like(this.access_token,this.ig_id).subscribe((res)=>{
      console.log(res);
      console.log(Object.entries(res));
      //console.log(Object.entries(res)[0][1].length);
      let len = Object.entries(res)[0][1].length;
      //console.log(len);
      let i=0;
      this.total_likes=0;
      for(i=0;i<len;i++){
        this.total_likes= this.total_likes + Object.entries(res)[0][1][i].like_count;
      }
      });
    //this.lscs_service.comment(this.access_token,this.ig_id);
  }
  fd(){
    this.fd_service.city(this.access_token,this.ig_id);
    this.fd_service.country(this.access_token,this.ig_id);
    this.fd_service.gender_age(this.access_token,this.ig_id);
    this.fd_service.locale(this.access_token,this.ig_id);
  }
  wbc_week(){
    this.wbcs.wc_week(this.access_token,this.ig_id).subscribe((res)=>{
      console.log(Object.entries(res)[0][1][0].values);
      let len = Object.entries(res)[0][1][0].values.length;
      console.log(len);
      let i=0;
      this.wcs=0;
      this.wcs_week = this.wcs_week + Object.entries(res)[0][1][0].values[1].value;
      console.log("website clicks=",this.wcs);
      });
  }
  nfs(){
    /*this.newfollowers.nf(this.access_token,this.ig_id).subscribe((res:any)=>{
      console.log(res.data);
        });*/
  }
  /*access_token_and_ig_id(auth_token : any) {
    let url='https://graph.facebook.com/v8.0/me/accounts?fields=access_token,instagram_business_account{id}&access_token='+auth_token;
    this.http.get(url).subscribe((res:any)=>{
      this.access_token=res.data[0].access_token;
      this.ig_id=res.data[0].instagram_business_account.id;
    });
  }*/
}


