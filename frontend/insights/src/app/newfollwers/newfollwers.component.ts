import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { NewfollowersService } from '../newfollowers.service';

@Component({
  selector: 'app-newfollwers',
  templateUrl: './newfollwers.component.html',
  styleUrls: ['./newfollwers.component.css','../dashboard/dashboard.component.css']
})
export class NewfollwersComponent implements OnInit {
  access_token: any;
  ig_id: any;
  toDisplay_profile_period=false;
  data_array_w: any="r";
  toDisplay_profile_period_week= true;
  toDisplay_profile_period_30= false;
  date_array_week :Array<Object>=[{"0":"date"}];
  newfollowers_p: number=0;
  newfollowers_pc: number=0;
  date: object={0:"date"};
  newfollowers_c: number=0;

  select_profile_period() {
    this.toDisplay_profile_period = !this.toDisplay_profile_period;
  }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets:[
      {
        data:[89,34,43,54,28,74,93],
        label: 'New Followers',
        backgroundColor: '#613DC1'
      }
    ]
  }
  barChartDatamonth = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets:[
      {
        data:[89,34,43,54,28,74,93],
        label: 'New Followers',
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

  constructor( private newfollowers : NewfollowersService,private router: Router) {
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
    this.nfs_week();
   }

  ngOnInit(): void {
  }
  nfs_week(){
    this.toDisplay_profile_period=false;
    this.toDisplay_profile_period_30=false;
    this.toDisplay_profile_period_week=true;
    this.newfollowers_c=0;
    this.newfollowers_p=0;
    let i=0,time="",date="",month="";
    this.newfollowers.nf_week(this.access_token,this.ig_id).subscribe((res)=>{
      console.log("new followers this week=",res);
      for(let i=0;i<Object.entries(res)[0][1][0].values.length;i++){
        this.newfollowers_c=this.newfollowers_c+Object.entries(res)[0][1][0].values[i].value;
        if (this.barChartData.datasets) {
          this.barChartData.datasets[0].data[i] = Object.entries(res)[0][1][0].values[i].value;
          }
          //console.log(Object.entries(res)[0][1][0].values[i].end_time);
          time=Object.entries(res)[0][1][0].values[i].end_time;
          date=time.substring(8,10);
          month=time.substring(5,7);
          if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
      }
      console.log("this.barChartData.datasets[0].data[i]=",this.barChartData.datasets[0].data);
      this.chart?.update();
      let j=0;
      this.data_array_w=Object.entries(this.date_array_week);
      //console.log(this.data_array_w);
      if (this.barChartData.labels) {
      //this.lineChartData.labels = [];
      for(j=0;j<Object.entries(res)[0][1][0].values.length;j++){
        this.barChartData.labels[j] = <string>Object.entries(this.data_array_w[j][1])[0][1];
      }
      console.log("this.barChartData.labels[j]",this.barChartData.labels);
      }
        this.chart?.update();
      this.newfollowers.nf_week_p(this.access_token,this.ig_id).subscribe((resp)=>{
        console.log("new followers previous week=",resp);
      for(let i=0;i<Object.entries(resp)[0][1][0].values.length;i++){
        this.newfollowers_p=this.newfollowers_p+Object.entries(resp)[0][1][0].values[i].value;
       }
       this.newfollowers_pc=((this.newfollowers_c-this.newfollowers_p)/this.newfollowers_p)*100;
       if(this.newfollowers_p===0){
        this.newfollowers_pc=0;
       }
      });
    });
    }
    nfs_30(){
      this.toDisplay_profile_period=false;
      this.toDisplay_profile_period_30=true;
      this.toDisplay_profile_period_week=false;
      this.newfollowers_c=0;
      this.newfollowers_p=0;
      let i=0,time="",date="",month="";
      this.newfollowers.nf_30(this.access_token,this.ig_id).subscribe((res)=>{
        console.log("new followers this month=",Object.entries(res)[0][1][0].values);
        for(let i=0;i<Object.entries(res)[0][1][0].values.length;i++){
          this.newfollowers_c=this.newfollowers_c+Object.entries(res)[0][1][0].values[i].value;
        if (this.barChartData.datasets) {
          this.barChartDatamonth.datasets[0].data[i] = Object.entries(res)[0][1][0].values[i].value;
          }
          //console.log(Object.entries(res)[0][1][0].values[i].end_time);
          time=Object.entries(res)[0][1][0].values[i].end_time;
          date=time.substring(8,10);
          month=time.substring(5,7);
          if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
        }
        this.chart?.update();
        let j=0;
        this.data_array_w=Object.entries(this.date_array_week);
        //console.log(this.data_array_w);
        if (this.barChartData.labels) {
        //this.lineChartData.labels = [];
        for(j=0;j<Object.entries(res)[0][1][0].values.length;j++){
          this.barChartDatamonth.labels[j] = <string>Object.entries(this.data_array_w[j][1])[0][1];
        }
        console.log("this.barChartDatamonth.labels[j]",this.barChartDatamonth.labels);
        }
          this.chart?.update();
      this.newfollowers.nf_30_p(this.access_token,this.ig_id).subscribe((resp)=>{
        console.log("new followers previous month=",resp);
        for(let i=0;i<Object.entries(res)[0][1][0].values.length;i++){
         this.newfollowers_p=this.newfollowers_p+Object.entries(resp)[0][1][0].values[i].value;
        }
      });
      });
      }
}
