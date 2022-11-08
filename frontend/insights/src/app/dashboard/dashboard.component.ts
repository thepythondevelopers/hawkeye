import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import {ChartData, Chart,ChartConfiguration,ChartType} from 'node_modules/chart.js';
import {registerables } from 'chart.js';
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
import { BaseChartDirective } from 'ng2-charts';

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
  pv_labels_week:Array<String>=[""];
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
  toDisplay_profile_period=false;
  toDisplay_website_period=false;
  Reach_weekp: any;
  toDisplay_reach_period_30= false;
  toDisplay_profile_period_30= false;
  toDisplay_website_period_30= false;
  toDisplay_reach_period_week= true;
  toDisplay_profile_period_week= true;
  toDisplay_website_period_week= true;
  toDisplay_imp_period_week= true;
  toDisplay_imp_period= false;
  toDisplay_np_period_week= true;
  toDisplay_np_period= false;
  impressions_weekp: any;
  Reach_30: any;
  Reach_30p: any;
  toDisplay_imp_period_30=false;
  toDisplay_np_period_30=false;
  impressions_30: any;
  impressions_30p: any;
  imp_30p: any;
  wcs: any;
  wcs_week: any;
  date: object={0:"date"};
  pf_date: object={0:"date"};
  month: object;
  data_array_w: any="r";
  date_array_week :Array<Object>=[{"0":"date"}];
  wcs_p: any;
  wcs_percentage_change: any;
  prv: any;
  prv_p: any;
  prv_percentage_change: any;
  timestamp: any;
  date_in_string:Array<String>=[""];
  date_in_string_30:Array<String>=[""];
  nps_week: any;
  nps_30: any;

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
  select_profile_period() {
    this.toDisplay_profile_period = !this.toDisplay_profile_period;
  }
  select_website_period() {
    this.toDisplay_website_period = !this.toDisplay_website_period;
  }
  select_imp_period() {
    this.toDisplay_imp_period = !this.toDisplay_imp_period;
  }
  select_np_period() {
    this.toDisplay_np_period = !this.toDisplay_np_period;
  }

  public lineChartDatamonth: ChartConfiguration['data'] = {
    datasets:[
      {
        data:[],
        label: 'Clicks',
        borderColor: '#E07001',
        tension: 0.5,
        pointBackgroundColor: '#ffff',
        pointBorderColor: '#E07001',
        backgroundColor: '#E07001'
      }
    ],
    labels: []
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets:[
      {
        data:[],
        label: 'Clicks',
        borderColor: '#E07001',
        tension: 0.5,
        pointBackgroundColor: '#ffff',
        pointBorderColor: '#E07001',
        backgroundColor: '#E07001'
      }
    ],
    labels: []
  }

  public lineChartData2: ChartConfiguration['data'] = {
    datasets:[
      {
        data:[],
        label: 'Clicks',
        borderColor: '#E07001',
        tension: 0.5,
        pointBackgroundColor: '#ffff',
        pointBorderColor: '#E07001',
        backgroundColor: '#E07001'
      }
    ],
    labels: []
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    } 
  }
  public lineChartType: ChartType = 'line';
  public doughnutChartType: ChartType = 'doughnut';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] }
    ]
  };

  constructor(private authService: SocialAuthService, private http: HttpClient,private router: Router,private reach_service : ContentreachService,private newpost : NewpostService,private toppost : ToppostService, private newfollowers : NewfollowersService, private wbcs : WbcsService, private dashboardservice: DashboardService, private impservice: ImpressionService, private fd_service : FollowersDetailsService, private lscs_service : LscsService,  private tfs : TotalfollowersService, private prfvisits : ProfilevisitsService ) { 
    Chart.register(...registerables);
    this.month={"0":"0"};
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
    this.np_week();
    this.wbc_week();
    this.pv_week();
    this.nfs_week();
    this.fd();
    this.cr();
  }
  ngOnInit(): void {
    /*this.authService.authState.subscribe((user) => {
      this.user = user;
      this.authtoken=user.authToken;
      console.log("User=",user.authToken);
      this.loggedIn = (user != null);
      this.access_token_and_ig_id(this.authtoken);
    });*/
    // Line Chart week for profile visits
    // Line Chart
    let lineCanvasEle: any = document.getElementById('line_chart')
    let lineChar = new Chart(lineCanvasEle.getContext('2d'), {
      type: 'line',
        data: {
          labels: this.pv_labels_week,
          datasets: [
            { data: [12, 15, 18, 14, 11, 19, 12], label: 'Visits',borderColor: '#E07001',tension: 0.5, pointBackgroundColor: '#ffff', pointBorderColor: '#E07001',backgroundColor: '#E07001' }
          ],
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
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
      console.log("week month",res);
      let i=0;
      this.Reach_30=0;
      for(i=0;i<30;i++){
        this.Reach_30=this.Reach_30+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 30 days",this.Reach_30);
    this.dashboardservice.reach_30p(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("month previous",res);
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
      console.log("week",res);
      let i=0;
      this.Reach_week=0;
      for(i=0;i<7;i++){
        this.Reach_week=this.Reach_week+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 7 days",this.Reach_30);
    this.dashboardservice.reach_week_p(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("week previous",res);
      let i=0;
      this.Reach_weekp=0;
      for(i=0;i<7;i++){
        this.Reach_weekp=this.Reach_weekp+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 7 days previous day",this.Reach_weekp);
      this.reach_percentage_change=<any>(((this.Reach_week-this.Reach_weekp)/this.Reach_weekp)*100).toFixed(2);
      });
      });
  }
  imp_30(){
    this.toDisplay_imp_period=false;
    this.toDisplay_imp_period_week=false;
    this.toDisplay_imp_period_30=true;
    this.impservice.impressions_30(this.access_token,this.ig_id).subscribe((res)=>{ 
      console.log("imp 30",res);
      let i=0;
      this.impressions_30=0;
      for(i=0;i<30;i++){
        this.impressions_30=this.impressions_30+(Object.entries(res)[0][1][0].values[i].value);
      } 
      console.log("impressions returned days_30 = ",this.impressions_30);
      //console.log("Impressions returned week",this.impressions_week);
    this.impservice.impressions_30p(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("imp 30p",res);
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
      console.log("Imp this week",res);
      let i=0;
      this.impressions_week=0;
      for(i=0;i<7;i++){
        this.impressions_week=this.impressions_week+(Object.entries(res)[0][1][0].values[i].value);
      } 
      console.log("impressions returned week = ",this.impressions_week);
      //console.log("Impressions returned week",this.impressions_week);
    this.impservice.impressions_week_p(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("Imp previous week",res);
      this.impressions_weekp=0;
      for(i=0;i<7;i++){
        this.impressions_weekp=this.impressions_weekp+(Object.entries(res)[0][1][0].values[i].value);
      } 
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
    this.reach_service.rp(this.access_token,this.ig_id).subscribe((res: any) => {
      console.log(res.media_product_type);
      if (res.media_product_type === "FEED") {
        this.http.get('https://graph.facebook.com/v15.0/'+this.ig_id+'/insights?metric=reach&access_token='+this.access_token).subscribe((resp:any)=>{
        console.log("feed reach="+resp);
        });
      }
      if (res.media_product_type === "REELS") {
        this.http.get('https://graph.facebook.com/v15.0/'+this.ig_id+'/insights?metric=reach&access_token='+this.access_token).subscribe((resp:any)=>{
          console.log("reels reach="+resp);
        });
      }
    });
    /*api : https://graph.facebook.com/v15.0/17958979106105032/insights?metric=reach&access_token=EAAJI21EvdxwBAGdIJoWFHcOokerpZBQD2iaJB08FVys4yDi7ZCRdMJbU3It2auPrZCcjYgSmlvvurUlb6l9ZC3ZBfgB49s1OUlNo1ZC3yZCL43hVcxFgdGNmmUOdZAGhxmA1n1xaFEu5FqfXJA0xEBbQYVcty8kiA13puBdr2rCYKvDDUONHAQt9
    this.mediaid.m_id().subscribe((res:any)=>{
      this.res_id=res;
      console.log(this.res_id.data[0]);
    });*/
  }
  np_week(){
    this.toDisplay_np_period=false;
    this.toDisplay_np_period_week=true;
    this.toDisplay_np_period_30=false;
    var dd, mm, yyyy, len, i,wcs=0;
    let date;
    this.nps_week=0;
    let now = new Date();
    let today = Math.floor(now.getTime() / 1000);
    for(i=0;i<7;i++){
      date = new Date((today-(i*24*60*60))*1000);
      console.log("date",date);
      dd = String(date.getDate()).padStart(2, '0');
      mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = date.getFullYear();
      this.date_in_string[i] = yyyy + '-' + mm + '-' + dd;
    }
    this.newpost.new_post_week(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("total posts this week",res);
      let len = Object.entries(res)[0][1].length;
      let j, timestamps;
      for(i=0;i<len;i++){
        timestamps=(Object.entries(res)[0][1][i].timestamp.substring(0,10));
        for(j=0;j<7;j++){
          if(this.date_in_string[j]===timestamps){
            this.nps_week++;
          }
        }
      }
    });
  }
  np_30(){
    this.toDisplay_np_period=false;
    this.toDisplay_np_period_week=false;
    this.toDisplay_np_period_30=true;
    var dd, mm, yyyy, len, i,wcs=0;
    let date;
    this.nps_30=0;
    let now = new Date();
    let today = Math.floor(now.getTime() / 1000);
    for(i=0;i<30;i++){
      date = new Date((today-(i*24*60*60))*1000);
      console.log("date",date);
      dd = String(date.getDate()).padStart(2, '0');
      mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      yyyy = date.getFullYear();
      this.date_in_string_30[i] = yyyy + '-' + mm + '-' + dd;
    }
    this.newpost.new_post_week(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("total posts this month",res);
      let len = Object.entries(res)[0][1].length;
      let j, timestamps;
      for(i=0;i<len;i++){
        timestamps=(Object.entries(res)[0][1][i].timestamp.substring(0,10));
        for(j=0;j<30;j++){
          if(this.date_in_string_30[j]===timestamps){
            this.nps_30++;
          }
        }
      }
      //console.log("nps this month=",this.nps_30);
      //console.log("this.date_in_string_30",this.date_in_string_30);
    });
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
    pv_week(){
    this.toDisplay_profile_period=false;
    this.toDisplay_profile_period_30=false;
    this.toDisplay_profile_period_week=true;
    this.prfvisits.pf_week(this.access_token,this.ig_id).subscribe((res)=>{
      let len = Object.entries(res)[0][1][0].values.length;
      this.prv=0;
      let i: number = 0,time="",date="",month="";
      for(i=0;i<len;i++){
        this.prv=this.prv+Object.entries(res)[0][1][0].values[i].value;
        this.lineChartData2.datasets[0].data[i] =Object.entries(res)[0][1][0].values[i].value;
        console.log("working=",this.lineChartData2.datasets[0].data[i]);
        //console.log(Object.entries(res)[0][1][0].values[i].end_time);
        time=Object.entries(res)[0][1][0].values[i].end_time;
        date=time.substring(8,10);
        month=time.substring(5,7);
        if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
      }
      //console.log("Total clicks=",this.wcs)
      let array_week:Array<String>=[], j: number = 0;
      this.data_array_w=Object.entries(this.date_array_week);
      //console.log(this.data_array_w);
      for(j=0;j<7;j++){
        array_week[j] = <String>Object.entries(this.data_array_w[j][1])[0][1];
      }
      this.pv_labels_week=array_week;
      console.log("this.pv_labels_week="+this.pv_labels_week);
      this.prfvisits.pf_week_p(this.access_token,this.ig_id).subscribe((res)=>{
        let len = Object.entries(res)[0][1][0].values.length;
        console.log(len);
        let i:number=0;
        this.prv_p=0;
        for(i=0;i<len;i++){
        this.prv_p=this.prv_p+Object.entries(res)[0][1][0].values[i].value;  
          console.log("prv_p",Object.entries(res)[0][1][0].values[i].value);
         }
        console.log("total clicks_p",this.wcs_p);
    this.prv_percentage_change=<any>(((this.prv-this.prv_p)/this.prv_p)*100).toFixed(2);
    console.log("this week pv=",this.prv);
    console.log("last week pv=",this.prv_p);
    console.log("percentage change=",this.prv_percentage_change);
    if(this.prv_p===0){
        this.prv_percentage_change=100;
    }
    if(this.prv_p===0 && this.prv===0){
      this.prv_percentage_change=0;
    }
          });
      });
  }
  pv_30(){
    this.toDisplay_profile_period=false;
    this.toDisplay_profile_period_30=true;
    this.toDisplay_profile_period_week=false;
    this.prfvisits.pf_30(this.access_token,this.ig_id).subscribe((res)=>{
      console.log(res);
      let len = Object.entries(res)[0][1][0].values.length;
      //console.log(len);
      this.prv=0;
      let i: number = 0,time="",date="",month="";
      while(i<len){
        this.prv=this.prv+Object.entries(res)[0][1][0].values[i].value;
        if (this.lineChartData2.datasets) {
        this.lineChartData2.datasets[0].data[i] = Object.entries(res)[0][1][0].values[i].value;
        console.log("working=",this.lineChartData2.datasets[0].data[i]);
        }
        //console.log(Object.entries(res)[0][1][0].values[i].end_time);
        time=Object.entries(res)[0][1][0].values[i].end_time;
        date=time.substring(8,10);
        month=time.substring(5,7);
        if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
      i++;
      }
      //console.log("Total clicks=",this.wcs)
      let j: number = 0;
      this.data_array_w=Object.entries(this.date_array_week);
      //console.log(this.data_array_w);
      if (this.lineChartData2.labels) {
      //this.lineChartData.labels = [];
      while(j<7){
        this.lineChartData2.labels[j] = [Object.entries(this.data_array_w[j][1])[0][1]];
        j++;
      }
      }
      this.prfvisits.pf_30_p(this.access_token,this.ig_id).subscribe((res)=>{
        console.log(res);
        let len = Object.entries(res)[0][1][0].values.length;
        console.log(len);
        let i:number=0;
        this.prv_p=0;
        while(i<len){
        this.prv_p=this.prv_p+Object.entries(res)[0][1][0].values[i].value;  
          console.log("prv_30_p",Object.entries(res)[0][1][0].values[i].value);
          i++;
         }
        console.log("total visits_p",this.wcs_p);
    this.prv_percentage_change=<any>(((this.prv-this.prv_p)/this.prv_p)*100).toFixed(2);
    if(this.prv_p===0){
        this.prv_percentage_change=100;
    }
    if(this.prv_p===0 && this.prv===0){
      this.prv_percentage_change=0;
    }
          });
      });
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
    let i;
    this.fd_service.city(this.access_token,this.ig_id).subscribe((res:any)=>{
      let fieldValues = res.data[0].values[0].value;
      let keys=Object.keys(res.data[0].values[0].value);
      for(i=0;i<Object.keys(res.data[0].values[0].value).length;i++){
        console.log("city",Object.keys(res.data[0].values[0].value)[i]);
        console.log("city values",keys.map(k => fieldValues[k])[i]);
        if (this.doughnutChartData.datasets) {
          this.doughnutChartData.datasets[0].data[i] = keys.map(k => fieldValues[k])[i];
          }
          this.doughnutChartLabels[i] = Object.keys(res.data[0].values[0].value)[i];
      }
      this.doughnutChartData.labels = this.doughnutChartLabels;
      this.chart?.update();
      });
    this.fd_service.country(this.access_token,this.ig_id).subscribe((res:any)=>{
      console.log("country",res.data[0].values[0].value);
      });
    this.fd_service.gender_age(this.access_token,this.ig_id).subscribe((res:any)=>{
      console.log("gender",res.data[0].values[0].value);
      });
    this.fd_service.locale(this.access_token,this.ig_id).subscribe((res:any)=>{
      console.log("locale",res.data[0].values[0].value);
      });
  }
  wbc_week(){
    this.toDisplay_website_period=false;
    this.toDisplay_website_period_30=false;
    this.toDisplay_website_period_week=true;
    this.wbcs.wc_week(this.access_token,this.ig_id).subscribe((res)=>{
      let len = Object.entries(res)[0][1][0].values.length;
      //console.log(len);
      this.wcs=0;
      let i=0,time="",date="",month="";
      for(i=0;i<len;i++){
        this.wcs=this.wcs+Object.entries(res)[0][1][0].values[i].value;
        if (this.lineChartData.datasets) {
        this.lineChartData.datasets[0].data[i] = Object.entries(res)[0][1][0].values[i].value;
        }
        //console.log(Object.entries(res)[0][1][0].values[i].end_time);
        time=Object.entries(res)[0][1][0].values[i].end_time;
        date=time.substring(8,10);
        month=time.substring(5,7);
        if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
      }
      this.chart?.update();
      //console.log("Total clicks=",this.wcs)
      let j=0;
      this.data_array_w=Object.entries(this.date_array_week);
      //console.log(this.data_array_w);
      if (this.lineChartData.labels) {
      //this.lineChartData.labels = [];
      for(j=0;j<7;j++){
        this.lineChartData.labels[j] = [Object.entries(this.data_array_w[j][1])[0][1]];
      }
      }
        this.chart?.update();
      this.wbcs.wc_week_p(this.access_token,this.ig_id).subscribe((res)=>{
        let len = Object.entries(res)[0][1][0].values.length;
        console.log(len);
        let i=0;
        this.wcs_p=0;
        for(i=0;i<len;i++){
        this.wcs_p=this.wcs_p+Object.entries(res)[0][1][0].values[i].value;  
          console.log("wbcs_p",Object.entries(res)[0][1][0].values[i].value);
         }
        console.log("total clicks_p",this.wcs_p);
    this.wcs_percentage_change=<any>(((this.wcs-this.wcs_p)/this.wcs_p)*100).toFixed(2);
    if(this.wcs_p===0){
        this.wcs_percentage_change='--';
    }
      });
      });
  }
  wbc_30(){
    this.toDisplay_website_period=false;
    this.toDisplay_website_period_week=false;
    this.toDisplay_website_period_30=true;
    this.wbcs.wc_30(this.access_token,this.ig_id).subscribe((res)=>{
      let len = Object.entries(res)[0][1][0].values.length;
      //console.log("wbcs=",len);
      this.wcs=0;
      let i=0,time="",date="",month="";
      for(i=0;i<len;i++){
        this.wcs=this.wcs+Object.entries(res)[0][1][0].values[i].value;
        if (this.lineChartDatamonth.datasets) {
        this.lineChartDatamonth.datasets[0].data[i] = Object.entries(res)[0][1][0].values[i].value;
        }
        //console.log(Object.entries(res)[0][1][0].values[i].end_time);
        time=Object.entries(res)[0][1][0].values[i].end_time;
        date=time.substring(8,10);
        month=time.substring(5,7);
        if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
      }
      this.chart?.update();
      console.log("Total clicks=",this.wcs)
      let j=0;
      this.data_array_w=Object.entries(this.date_array_week);
      //console.log(this.data_array_w);
      if (this.lineChartDatamonth.labels) {
      //this.lineChartData.labels = [];
      for(j=0;j<30;j++){
        this.lineChartDatamonth.labels[j] = [Object.entries(this.data_array_w[j][1])[0][1]];
        console.log([Object.entries(this.data_array_w[j][1])[0][1]]);
      }
      }
        this.chart?.update();
        this.wbcs.wc_30_p(this.access_token,this.ig_id).subscribe((res)=>{
          let len = Object.entries(res)[0][1][0].values.length;
          let i=0;
          this.wcs_p=0;
          for(i=0;i<len;i++){
          this.wcs_p=this.wcs_p+Object.entries(res)[0][1][0].values[i].value;  
          //console.log("wbcs_p",Object.entries(res)[0][1][0].values[i].value);
          //console.log("wbcs_p",Object.entries(res)[0][1][0].values[i].end_time);
          }
          //console.log("total clicks_30p",this.wcs_p);
          console.log("this.wcs",this.wcs,"this.wcs_p",this.wcs_p)
      this.wcs_percentage_change=<any>(((this.wcs-this.wcs_p)/this.wcs_p)*100).toFixed(2);
          console.log("percentage change last month",this.wcs_percentage_change)
      if(this.wcs_p===0){
        this.wcs_percentage_change=100;
      }
          });
      });
  }
  nfs_week(){
  this.newfollowers.nf_week(this.access_token,this.ig_id).subscribe((res)=>{
    console.log("new followers week",res);
  });
  }
  nfs_30(){
    this.newfollowers.nf_30(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("week",res);
      let i=0;
      this.Reach_week=0;
      for(i=0;i<7;i++){
        this.Reach_week=this.Reach_week+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 7 days",this.Reach_30);
    this.dashboardservice.reach_week_p(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("week previous",res);
      let i=0;
      this.Reach_weekp=0;
      for(i=0;i<7;i++){
        this.Reach_weekp=this.Reach_weekp+(Object.entries(res)[0][1][0].values[i].value);
      }
      console.log("reach in 7 days previous day",this.Reach_weekp);
      this.reach_percentage_change=<any>(((this.Reach_week-this.Reach_weekp)/this.Reach_weekp)*100).toFixed(2);
      });
    });
    }
}


