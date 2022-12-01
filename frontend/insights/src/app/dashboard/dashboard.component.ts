import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import {ChartData, Chart,ChartConfiguration,ChartType, TimeScale} from 'node_modules/chart.js';
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
import { MediaTypeService } from '../media-type.service';
import { TotalFollowingService } from '../total-following.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  toDisplay = false;
  toDisplay_pages = false;
  toDisplay1 = false;
  toDisplay3 = false;
  res_id:any;
  user:any;
  pv_labels_week:Array<String>=[""];
  authtoken:any;
  loggedIn:any;
  access_token: any;
  ig_id: any;
  unit_change:number=0;
  Reach_day: any;
  Reach_week: any;
  impressions_day: any;
  impressions_week: any;
  imp_percentage_change: any;
  reach_percentage_change: any;
  total_followers: any;
  tf_inc_30: any;
  total_shared:number=0;
  total_likes: any;
  total_comments: any;
  new_following_pcm:number=0;
  new_following_pcw:number=0;
  toDisplay_reach_period=false;
  toDisplay_dropdown_beside_profile=false;
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
  toDisplay_newfollowing_week= true;
  toDisplay_newfollowing_period= false;
  toDisplay_np_period_week= true;
  toDisplay_np_period= false;
  impressions_weekp: any;
  Reach_30: any;
  Reach_30p: any;
  toDisplay_imp_period_30=false;
  toDisplay_newfollowing_month=false;
  toDisplay_np_period_30=false;
  impressions_30: any;
  i:number=0;
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
  test:String="";
  toDisplay_toppost_options=false;
  feed_reach: number = 0;
  reel_reach: number = 0;
  new_following_week: number=0;
  new_following_month: number=0;
  toppost_by_likes:Array<Number>=[];
  toppost_permalink:Array<string>=[];
  toppost_by_comments:Array<Number>=[];
  toppost_by_likes0:Number=0;
  toppost_by_likes1:Number=0;
  toppost_by_likes2:Number=0;
  toppost_by_likes3:Number=0;
  toppost_by_likes4:Number=0;
  toppost_by_likes5:Number=0;
  toppost_by_comments0:Number=0;
  toppost_by_comments1:Number=0;
  toppost_by_comments2:Number=0;
  toppost_by_comments3:Number=0;
  toppost_by_comments4:Number=0;
  toppost_by_comments5:Number=0;
  toppost_by_caption0:String="";
  toppost_by_caption1:String="";
  toppost_by_caption2:String="";
  toppost_by_caption3:String="";
  toppost_by_caption4:String="";
  toppost_by_caption5:String="";
  toppost_by_caption:Array<String>=[];
  toDisplay_tpcaptions_likes=true;
  toDisplay_tpcaptions_saved=false;
  toDisplay_tpcaptions_reach=false;
  toDisplay_tpcaptions_comments=false;
  toDisplay_tpcount_likes=true;
  toDisplay_tpcount_comments=false;
  toDisplay_tpcount_reach=false;
  toDisplay_tpcount_saved=false;
  media_id: any;
  new_following_week_p: number=0;
  new_following_month_pr: number=0;
  toDisplay_total_options: boolean=false;
  toDisplay_total_likes:boolean=true;
  toDisplay_total_saved:boolean=false;
  toDisplay_total_comments:boolean=false;
  toDisplay_total_shares:boolean=false;
  total_saved:number=0;
  toppost_permalink0:string="";
  toppost_permalink5:string="";
  toppost_permalink1:string="";
  toppost_permalink2:string="";
  toppost_permalink3:string="";
  toppost_permalink4:string="";
  toDisplay_fdo=false;


  select_reach_period() {
    this.toDisplay_reach_period = !this.toDisplay_reach_period;
  }
  select_profile_period() {
    this.toDisplay_profile_period = !this.toDisplay_profile_period;
  }
  select_website_period() {
    this.toDisplay_website_period = !this.toDisplay_website_period;
  }
  select_toppost_options() {
    this.toDisplay_toppost_options = !this.toDisplay_toppost_options;
  }
  select_imp_period() {
    this.toDisplay_imp_period = !this.toDisplay_imp_period;
  }
  select_newfollowing_period() {
    this.toDisplay_newfollowing_period = !this.toDisplay_newfollowing_period;
  }
  select_np_period() {
    this.toDisplay_np_period = !this.toDisplay_np_period;
  }
  select_total_options(){
    this.toDisplay_total_options=!this.toDisplay_total_options;
    //toDisplay_total_likes=false;
    //toDisplay_total_comments=false;
  }
  total_like(){
    this.toDisplay_total_saved=false;
    this.toDisplay_total_comments=false;
    this.toDisplay_total_shares=false;
    this.toDisplay_total_likes=true;
    this.toDisplay_total_options=false;
  }
  total_comment(){
    this.toDisplay_total_saved=false;
    this.toDisplay_total_comments=true;
    this.toDisplay_total_shares=false;
    this.toDisplay_total_likes=false;
    this.toDisplay_total_options=false;
  }
  total_shares(){
    this.toDisplay_total_saved=false;
    this.toDisplay_total_comments=false;
    this.toDisplay_total_shares=true;
    this.toDisplay_total_likes=false;
    this.toDisplay_total_options=false;
  }
  total_saves(){
    this.toDisplay_total_saved=true;
    this.toDisplay_total_comments=false;
    this.toDisplay_total_shares=false;
    this.toDisplay_total_likes=false;
    this.toDisplay_total_options=false;
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

  constructor(private total_following : TotalFollowingService, private media_type : MediaTypeService, private authService: SocialAuthService, private http: HttpClient,private router: Router,private reach_service : ContentreachService,private newpost : NewpostService,private toppost : ToppostService, private newfollowers : NewfollowersService, private wbcs : WbcsService, private dashboardservice: DashboardService, private impservice: ImpressionService, private fd_service : FollowersDetailsService, private lscs_service : LscsService,  private tfs : TotalfollowersService, private prfvisits : ProfilevisitsService ) { 
    Chart.register(...registerables);
    this.month={"0":"0"};
    this.run();
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
    if(!localStorage.getItem("email")){
      this.router.navigate(['/signup']);
    }
    else{
      if(!localStorage.getItem("auth_token")){
        this.router.navigate(['/login-with-facebook']);
      }
    }
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
    this.reach_week();
    this.imp_week();
    this.tf();
    this.lscs();
    this.newfollowing_week();
    this.np_week();
    this.tp_likes();
    this.wbc_week();
    this.pv_week();
    this.nfs_week();
    this.fd();
    this.cr();
    //this.new_following_month_p();
    //this.t_following();
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
    setInterval(() => {
      this.t_following();
    },86400000);
  }
  profile(){

  }
  signInWithFB(): void {
    const fbLoginOptions = {
      scope: 'email,public_profile,pages_show_list,instagram_basic,pages_read_engagement,read_insights,ads_read,instagram_manage_insights,pages_manage_engagement'
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions);
  }
  wbcs_calender(){
    this.router.navigate(['wbcs/calender']);
  }
  reach_calender(){
    this.router.navigate(['reach/calender']);
  }
  imp_calender(){
    this.router.navigate(['impression/calender']);
  }
  newpost_calender(){
    this.router.navigate(['newpost/calender']);
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
  tp_likes(){
    this.toDisplay_toppost_options=false;
    this.toDisplay_tpcaptions_likes=true;
    this.toDisplay_tpcaptions_saved=false;
    this.toDisplay_tpcaptions_reach=false;
    this.toDisplay_tpcaptions_comments=false;
    this.toDisplay_tpcount_likes=true;
    this.toDisplay_tpcount_comments=false;
    this.toDisplay_tpcount_reach=false;
    this.toDisplay_tpcount_saved=false;
    this.toppost.top(this.access_token,this.ig_id).subscribe((res)=>{
    console.log("likes=",Object.entries(res)[0][1][0].permalink);
    for(let i=0;i<Object.entries(res)[0][1].length;i++){
      this.toppost_by_likes[i]=Object.entries(res)[0][1][i].like_count;
      this.toppost_permalink[i]=Object.entries(res)[0][1][i].permalink;
      this.toppost_by_caption[i]=Object.entries(res)[0][1][i].caption;
      console.log("caption=",this.toppost_by_caption);
    }
    let a=0;
    for(let j=0;j<Object.entries(res)[0][1].length;j++){
      let a=this.toppost_by_likes[j];
      let p=this.toppost_permalink[j];
      let c=this.toppost_by_caption[j];
      for(let i=j;i<Object.entries(res)[0][1].length;i++){
        //console.log("post=",a);
        if(a<this.toppost_by_likes[i]){
          let b = a;
          let caption=c;
          let permalink = p;
          a=this.toppost_by_likes[i];
          c=this.toppost_by_caption[i];
          p=this.toppost_permalink[i];
          this.toppost_by_likes[i]=b;
          this.toppost_by_caption[i]=caption;
          this.toppost_permalink[i]=permalink;
        }
      }
      this.toppost_by_likes[j]=a;
      this.toppost_by_caption[j]=c;
      this.toppost_permalink[j]=p;
      if(j===0){
        this.toppost_by_likes0=a;
        this.toppost_by_caption0=c.substring(0,30);
        this.toppost_permalink0=p;
        console.log("top post by like=",this.toppost_by_likes0);
        console.log("top post by caption=",this.toppost_by_caption0);
      }
      if(j===1){
        this.toppost_permalink1=p;
        this.toppost_by_likes1=a;
        this.toppost_by_caption1=c.substring(0,30);
      }
      if(j===2){
        this.toppost_permalink2=p;
        this.toppost_by_likes2=a;
        this.toppost_by_caption2=c.substring(0,30);
      }
      if(j===3){
        this.toppost_permalink3=p;
        this.toppost_by_likes3=a;
        this.toppost_by_caption3=c.substring(0,30);
      }
      if(j===4){
        this.toppost_permalink4=p;
        this.toppost_by_likes4=a;
        this.toppost_by_caption4=c.substring(0,30);
      }
      if(j===5){
        this.toppost_permalink5=p;
        this.toppost_by_likes5=a;
        this.toppost_by_caption5=c.substring(0,30);
      }
      console.log("top post=",this.toppost_by_likes);
    }
    })
  }
  tp_comments(){
    this.toDisplay_toppost_options=false;
    this.toDisplay_tpcaptions_likes=false;
    this.toDisplay_tpcaptions_saved=false;
    this.toDisplay_tpcaptions_reach=false;
    this.toDisplay_tpcaptions_comments=true;
    this.toDisplay_tpcount_likes=false;
    this.toDisplay_tpcount_comments=true;
    this.toDisplay_tpcount_reach=false;
    this.toDisplay_tpcount_saved=false;
    this.toppost.top(this.access_token,this.ig_id).subscribe((res)=>{
    console.log("likes=",res);
    for(let i=0;i<Object.entries(res)[0][1].length;i++){
      this.toppost_by_comments[i]=Object.entries(res)[0][1][i].comments_count;
      this.toppost_permalink[i]=Object.entries(res)[0][1][i].permalink;
      this.toppost_by_caption[i]=Object.entries(res)[0][1][i].caption;
      console.log("caption=",this.toppost_by_caption);
    }
    let a=0;
    for(let j=0;j<Object.entries(res)[0][1].length;j++){
      let a=this.toppost_by_comments[j];
      let p=this.toppost_permalink[j];
      let c=this.toppost_by_caption[j];
      for(let i=j;i<Object.entries(res)[0][1].length;i++){
        //console.log("post=",a);
        if(a<this.toppost_by_comments[i]){
          let b = a;
          let caption=c;
          let permalink = p;
          a=this.toppost_by_comments[i];
          c=this.toppost_by_caption[i];
          p=this.toppost_permalink[i];
          this.toppost_by_comments[i]=b;
          this.toppost_by_caption[i]=caption;
          this.toppost_permalink[i]=permalink;
        }
      }
      this.toppost_by_comments[j]=a;
      this.toppost_by_caption[j]=c;
      if(j===0){
        this.toppost_permalink0=p;
        this.toppost_by_likes0=a;
        this.toppost_by_caption0=c.substring(0,30);
        console.log("top post by like=",this.toppost_by_likes0);
        console.log("top post by caption=",this.toppost_by_comments0);
      }
      if(j===1){
        this.toppost_permalink1=p;
        this.toppost_by_likes1=a;
        this.toppost_by_caption1=c.substring(0,30);
      }
      if(j===2){
        this.toppost_permalink2=p;
        this.toppost_by_likes2=a;
        this.toppost_by_caption2=c.substring(0,30);
      }
      if(j===3){
        this.toppost_permalink3=p;
        this.toppost_by_likes3=a;
        this.toppost_by_caption3=c.substring(0,30);
      }
      if(j===4){
        this.toppost_permalink4=p;
        this.toppost_by_likes4=a;
        this.toppost_by_caption4=c.substring(0,30);
      }
      if(j===5){
        this.toppost_permalink5=p;
        this.toppost_by_likes5=a;
        this.toppost_by_caption5=c.substring(0,30);
      }
      console.log("top post by comments=",this.toppost_by_likes);
    }
    })
  }
  tp_saved(){
    environment.env_var_tp_saved=0;
    this.toDisplay_toppost_options=false;
    this.toDisplay_tpcaptions_likes=false;
    this.toDisplay_tpcaptions_saved=true;
    this.toDisplay_tpcaptions_reach=false;
    this.toDisplay_tpcaptions_comments=false;
    this.toDisplay_tpcount_likes=false;
    this.toDisplay_tpcount_comments=false;
    this.toDisplay_tpcount_reach=false;
    this.toDisplay_tpcount_saved=true;
    var saved_array:number[] = new Array();
    var saved_permalink_caption: { saved: number, permalink: string, caption: string } = {
      saved: 0,
      permalink: "",
      caption: ""
    };
    var temp: { saved: number, permalink: string, caption: string } = {
      saved: 0,
      permalink: "",
      caption: ""
    };
    var permalink_array:string[] = new Array();
    let i=0,k=0;
    var spc:Array<object>=[{}];
    var caption_array:string[] = new Array();
    this.lscs_service.like(this.access_token,this.ig_id).subscribe((response)=>{
      let length=Object.entries(response)[0][1].length;
      //console.log("length from saved=",length);
      let m=0,a:Array<number>;
      for(m=0;m<length;m++){
      this.media_id=Object.entries(response)[0][1][m].id;
      this.toppost.top2(this.access_token,this.media_id).subscribe((res)=>{
        let mid= Object.entries(res)[0][1][0].id.substring(0,17);
        console.log("mid=",mid);
        this.toppost.permalink_caption(this.access_token,mid).subscribe((resp)=>{
        let j=environment.env_var_tp_saved++;
        //console.log("respone from permalink_Caption=",Object.entries(res));
         saved_array[j]=Object.entries(res)[0][1][0].values[0].value;
        //console.log("saved value response=",saved_array[m]);
        permalink_array[j]=Object.entries(resp)[0][1];
        caption_array[j]=Object.entries(resp)[1][1];
        console.log("caption array=",caption_array);
        console.log("permalink array=",permalink_array);
        saved_permalink_caption={saved:saved_array[j],permalink:permalink_array[j],caption:caption_array[j]}
        spc[j]=saved_permalink_caption;
      for(i=0;i<spc.length;i++){
        for(k=i+1;k<spc.length;k++){
          if(Object.entries(spc[i])[0][1]<Object.entries(spc[k])[0][1]){
            temp={saved:Object.entries(spc[i])[0][1],permalink:Object.entries(spc[i])[1][1],caption:Object.entries(spc[i])[2][1]}
            spc[i] = {saved:Object.entries(spc[k])[0][1],permalink:Object.entries(spc[k])[1][1],caption:Object.entries(spc[k])[2][1]};  
            spc[k] = temp; 
          }
        }
      }
      this.toppost_by_caption0=Object.entries(spc[0])[2][1].substring(0,30);
      this.toppost_by_caption1=Object.entries(spc[1])[2][1].substring(0,30);
      this.toppost_by_caption2=Object.entries(spc[2])[2][1].substring(0,30);
      this.toppost_by_caption3=Object.entries(spc[3])[2][1].substring(0,30);
      this.toppost_by_caption4=Object.entries(spc[4])[2][1].substring(0,30);
      this.toppost_by_caption5=Object.entries(spc[5])[2][1].substring(0,30);
      this.toppost_by_likes0=Object.entries(spc[0])[0][1];
      this.toppost_by_likes1=Object.entries(spc[1])[0][1];
      this.toppost_by_likes2=Object.entries(spc[2])[0][1];
      this.toppost_by_likes3=Object.entries(spc[3])[0][1];
      this.toppost_by_likes4=Object.entries(spc[4])[0][1];
      this.toppost_by_likes5=Object.entries(spc[5])[0][1];
      this.toppost_permalink0=Object.entries(spc[0])[1][1];
      this.toppost_permalink1=Object.entries(spc[1])[1][1];
      this.toppost_permalink2=Object.entries(spc[2])[1][1];
      this.toppost_permalink3=Object.entries(spc[3])[1][1];
      this.toppost_permalink4=Object.entries(spc[4])[1][1];
      this.toppost_permalink5=Object.entries(spc[5])[1][1];
        })
      })
      }
    })
  }
  tp_reach(){
    environment.env_var_tp_reach=0;
    this.toDisplay_toppost_options=false;
    this.toDisplay_tpcaptions_likes=false;
    this.toDisplay_tpcaptions_saved=false;
    this.toDisplay_tpcaptions_reach=true;
    this.toDisplay_tpcaptions_comments=false;
    this.toDisplay_tpcount_likes=false;
    this.toDisplay_tpcount_comments=false;
    this.toDisplay_tpcount_reach=true;
    this.toDisplay_tpcount_saved=false;
    var reach_array:number[] = new Array();
    var reach_permalink_caption: { reach: number, permalink: string, caption: string } = {
      reach: 0,
      permalink: "",
      caption: ""
    };
    var temp_reach: { reach: number, permalink: string, caption: string } = {
      reach: 0,
      permalink: "",
      caption: ""
    };
    var reach_permalink_array:string[] = new Array();
    let i=0,k=0;
    var rpc:Array<object>=[{}];
    var reach_caption_array:string[] = new Array();
    this.lscs_service.like(this.access_token,this.ig_id).subscribe((response)=>{
      let length=Object.entries(response)[0][1].length;
      //console.log("length from saved=",length);
      let m=0,a:Array<number>;
      for(m=0;m<length;m++){
      this.media_id=Object.entries(response)[0][1][m].id;
      this.toppost.top_reach(this.access_token,this.media_id).subscribe((res)=>{
        let mid= Object.entries(res)[0][1][0].id.substring(0,17);
        console.log("mid=",mid);
        this.toppost.permalink_caption(this.access_token,mid).subscribe((resp)=>{
        let j=environment.env_var_tp_reach++;
        //console.log("respone from permalink_Caption=",Object.entries(res));
         reach_array[j]=Object.entries(res)[0][1][0].values[0].value;
        //console.log("saved value response=",saved_array[m]);
        reach_permalink_array[j]=Object.entries(resp)[0][1];
        reach_caption_array[j]=Object.entries(resp)[1][1];
        console.log("caption array=",reach_caption_array);
        console.log("permalink array=",reach_permalink_array);
        reach_permalink_caption={reach:reach_array[j],permalink:reach_permalink_array[j],caption:reach_caption_array[j]}
        rpc[j]=reach_permalink_caption;
      for(i=0;i<rpc.length;i++){
        for(k=i+1;k<rpc.length;k++){
          if(rpc[k]===undefined){
            return;
          }
            if(Object.entries(rpc[i])[0][1]<Object.entries(rpc[k])[0][1]){
              temp_reach={reach:Object.entries(rpc[i])[0][1],permalink:Object.entries(rpc[i])[1][1],caption:Object.entries(rpc[i])[2][1]}
              rpc[i] = {saved:Object.entries(rpc[k])[0][1],permalink:Object.entries(rpc[k])[1][1],caption:Object.entries(rpc[k])[2][1]};  
              rpc[k] = temp_reach; 
            }
        }
      }
      this.toppost_by_caption0=Object.entries(rpc[0])[2][1].substring(0,30);
      this.toppost_by_caption1=Object.entries(rpc[1])[2][1].substring(0,30);
      this.toppost_by_caption2=Object.entries(rpc[2])[2][1].substring(0,30);
      this.toppost_by_caption3=Object.entries(rpc[3])[2][1].substring(0,30);
      this.toppost_by_caption4=Object.entries(rpc[4])[2][1].substring(0,30);
      this.toppost_by_caption5=Object.entries(rpc[5])[2][1].substring(0,30);
      this.toppost_by_likes0=Object.entries(rpc[0])[0][1];
      this.toppost_by_likes1=Object.entries(rpc[1])[0][1];
      this.toppost_by_likes2=Object.entries(rpc[2])[0][1];
      this.toppost_by_likes3=Object.entries(rpc[3])[0][1];
      this.toppost_by_likes4=Object.entries(rpc[4])[0][1];
      this.toppost_by_likes5=Object.entries(rpc[5])[0][1];
      this.toppost_permalink0=Object.entries(rpc[0])[1][1];
      this.toppost_permalink1=Object.entries(rpc[1])[1][1];
      this.toppost_permalink2=Object.entries(rpc[2])[1][1];
      this.toppost_permalink3=Object.entries(rpc[3])[1][1];
      this.toppost_permalink4=Object.entries(rpc[4])[1][1];
      this.toppost_permalink5=Object.entries(rpc[5])[1][1];
        })
      })
      }
    })
  }
  cr(){
    this.lscs_service.like(this.access_token,this.ig_id).subscribe((res)=>{
      let length=Object.entries(res)[0][1].length;
      let ig_media_id,type_media_id;
      console.log("length",length)
      for(let i=0;i<length;i++){
        ig_media_id=Object.entries(res)[0][1][i].id;
        this.media_type.mt(this.access_token,ig_media_id).subscribe((res: any) => {
          console.log("media_product_type",res.media_product_type);
          type_media_id=res.id;
          //console.log(res.media_product_type);
          if (res.media_product_type === "FEED") {
            this.reach_service.rp(this.access_token,type_media_id).subscribe((resp)=>{
               this.feed_reach=this.feed_reach+Object.entries(resp)[0][1][0].values[0].value;
            })
          }
          if (res.media_product_type === "REELS") {
            this.reach_service.rp(this.access_token,type_media_id).subscribe((resp)=>{
              this.reel_reach=this.reel_reach+Object.entries(resp)[0][1][0].values[0].value;
            })
          }
        });
      }
    })
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
    let present_day=0,yesterday=0, date;
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
            if(j===0){
            present_day++;
            }
            if(j===1){
            yesterday++;
            }
          }
        }
      }
      this.unit_change=(present_day-yesterday);
    });
  }
  np_30(){
    this.toDisplay_np_period=false;
    this.toDisplay_np_period_week=false;
    this.toDisplay_np_period_30=true;
    var dd, mm, yyyy, len, i,wcs=0;
    let present_day=0,yesterday=0, date;
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
            if(j===0){
              present_day++;
              }
              if(j===1){
              yesterday++;
              }
          }
        }
      }
      this.unit_change=(present_day-yesterday);
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
      this.lscs_service.comment(this.access_token,this.ig_id).subscribe((res)=>{
        console.log("comment data=",res);
        console.log(Object.entries(res));
        //console.log(Object.entries(res)[0][1].length);
        let len = Object.entries(res)[0][1].length;
        console.log("comment length=",len);
        //console.log(len);
        let i=0;
        this.total_comments=0;
        for(i=0;i<len;i++){
          this.total_comments= this.total_comments + Object.entries(res)[0][1][i].comments_count;
        }
      console.log("total comments=",this.total_comments);
        });
        this.lscs_service.like(this.access_token,this.ig_id).subscribe((res)=>{
          let length=Object.entries(res)[0][1].length;
          let ig_media_id,type_media_id;
          console.log("length",length)
          for(let i=0;i<length;i++){
            ig_media_id=Object.entries(res)[0][1][i].id;
            this.lscs_service.shared(this.access_token,ig_media_id).subscribe((resp)=>{
              this.total_shared=this.total_shared+Object.entries(resp)[0][1][0].values[0].value;
            })
          }
        })
        this.lscs_service.like(this.access_token,this.ig_id).subscribe((res)=>{
          let length=Object.entries(res)[0][1].length;
          let ig_media_id,type_media_id;
          console.log("length",length)
          for(let i=0;i<length;i++){
            ig_media_id=Object.entries(res)[0][1][i].id;
            this.lscs_service.saved(this.access_token,ig_media_id).subscribe((resp)=>{
              console.log("total saved=",resp)
              this.total_saved=this.total_saved+Object.entries(resp)[0][1][0].values[0].value;
            })
          }
        })
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
    newfollowing_week(){
      this.toDisplay_newfollowing_period=false;
      this.toDisplay_newfollowing_week=true;
      this.toDisplay_newfollowing_month=false;
    }
    newfollowing_month(){
      this.toDisplay_newfollowing_month=true;
      this.toDisplay_newfollowing_week=false;
      this.toDisplay_newfollowing_period=false;
    }
    t_following(){
      this.total_following.tfollowing(this.access_token,this.ig_id).subscribe((res)=>{
      //console.log("Total following count=",Object.entries(res)[0][1]);
      //console.log("User id=",Object.entries(res)[1][1]);
      //let now = new Date();
      //let date_in_unix = Math.floor(now.getTime() / 1000);
      //console.log("todays date=",date_in_unix);
      let req:any;
      let request ={"id": Object.entries(res)[1][1]}
      this.http.post(environment.baseURL+'/get_following',request).subscribe((resp:any)=>{
      console.log("following coming from database",resp)
      this.new_following_week=resp.following_day24+resp.following_day25+resp.following_day26+resp.following_day27+resp.following_day28+resp.following_day29+resp.following_day30;
      this.new_following_month=resp.following_day1+resp.following_day2+resp.following_day3+resp.following_day4+resp.following_day5+resp.following_day6+resp.following_day7+resp.following_day8+resp.following_day9+resp.following_day10+resp.following_day11+resp.following_day12+resp.following_day13+resp.following_day14+resp.following_day15+resp.following_day16+resp.following_day17+resp.following_day18+resp.following_day19+resp.following_day20+resp.following_day21+resp.following_day22+resp.following_day23+resp.following_day24+resp.following_day25+resp.following_day26+resp.following_day27+resp.following_day28+resp.following_day29+resp.following_day30;
      this.new_following_pcm=<any>(((this.new_following_month-resp.following_previous_month)/resp.following_previous_month)*100).toFixed(2);
      this.new_following_week_p=resp.following_day17+resp.following_day18+resp.following_day19+resp.following_day20+resp.following_day21+resp.following_day22+resp.following_day23;
      if(resp.following_day1===0){
        this.new_following_pcm=0;
      }
      this.new_following_pcw=<any>(((this.new_following_week-this.new_following_week_p)/this.new_following_week_p)*100).toFixed(2);
      if(this.new_following_week_p===0){
        this.new_following_pcw=0;
      }
      if(resp.following_previous_month===0){
        this.new_following_pcm=0;
      }
      if(resp.msg==='No data found'){
        this.http.post(environment.baseURL+'/save_following',{"id": Object.entries(res)[1][1], "f_change": 0, "total":Object.entries(res)[0][1]}).subscribe((response:any)=>{
      
      })
      }
      else{
        this.http.post(environment.baseURL+'/save_following',{"id": Object.entries(res)[1][1], "total":Object.entries(res)[0][1], "count": Object.entries(res)[0][1], "f1":resp.following_day1, "f2":resp.following_day2,"f3":resp.following_day3,"f4":resp.following_day4,"f5":resp.following_day5,"f6":resp.following_day6,"f7":resp.following_day7,"f8":resp.following_day8,"f9":resp.following_day9,"f10":resp.following_day10,"f11":resp.following_day11,"f12":resp.following_day12,"f13":resp.following_day13,"f14":resp.following_day14,"f15":resp.following_day15,"f16":resp.following_day16,"f17":resp.following_day17,"f18":resp.following_day18,"f19":resp.following_day19,"f20":resp.following_day20,"f21":resp.following_day21,"f22":resp.following_day22,"f23":resp.following_day23,"f24":resp.following_day24,"f25":resp.following_day25,"f26":resp.following_day26,"f27":resp.following_day27,"f28":resp.following_day28,"f29":resp.following_day29,"f30":resp.following_day30,"f_change":(Object.entries(res)[0][1]-resp.total_following)}).subscribe((response:any)=>{
        })
      }
      })
      })
    }
    new_following_month_p(){
      this.total_following.tfollowing(this.access_token,this.ig_id).subscribe((res)=>{
        let request ={"id": Object.entries(res)[1][1]};
        console.log("Request:",request);
        this.http.post(environment.baseURL+'/get_following',request).subscribe((resp:any)=>{
        this.new_following_month_pr=resp.following_day1+resp.following_day2+resp.following_day3+resp.following_day4+resp.following_day5+resp.following_day6+resp.following_day7+resp.following_day8+resp.following_day9+resp.following_day10+resp.following_day11+resp.following_day12+resp.following_day13+resp.following_day14+resp.following_day15+resp.following_day16+resp.following_day17+resp.following_day18+resp.following_day19+resp.following_day20+resp.following_day21+resp.following_day22+resp.following_day23+resp.following_day24+resp.following_day25+resp.following_day26+resp.following_day27+resp.following_day28+resp.following_day29+resp.following_day30;
        this.http.post(environment.baseURL+'/save_following_month_p',{"id":request.id,"following_previous_month":this.new_following_month_pr}).subscribe((response:any)=>{
        if(response.msg==="Following previous month updated Successfully"){
          console.log("Following previous month updated Successfully");
        }
        })
      })
      })
    }
    logout(){
      localStorage.clear();
      this.router.navigate(['/signup']);
    }
}


