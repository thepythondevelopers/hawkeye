import { WbcsService } from '../wbcs.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {NgToastService} from 'ng-angular-popup'

@Component({
  selector: 'app-website-clicks-insights',
  templateUrl: './website-clicks-insights.component.html',
  styleUrls: ['./website-clicks-insights.component.css','../reach-calender/reach-calender.component.css'],
  providers: [DatePipe]
})
export class WebsiteClicksInsightsComponent implements OnInit {
  access_token: any;
  ig_id: any;
  now_date:any;
  error:string="";
  display_error:boolean=false;
  display_count:boolean=false;
  wcs_count: any;
  displaymonthchart:boolean=false;
  displayweekchart:boolean=true;
  date: object={0:"date"};
  date_array_week :Array<Object>=[{"0":"date"}];
  data_array_w: any="r";
  wcs_p: any;
  wcs_percentage_change: any;
  wcs: any;
  constructor(private wbcs : WbcsService,private datepipe: DatePipe,private toast:NgToastService) {
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
   }

  ngOnInit(): void {
  }
  public lineChartDataweek: ChartConfiguration['data'] = {
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
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  wbcsdata(data:any){
    this.now_date=new Date();
    let latest_unix=0,date_unix=0;
    let latest_date =this.datepipe.transform(this.now_date, 'yyyy-MM-dd');
    console.log("latest date=",latest_date);
    if(latest_date){
    latest_unix=new Date(latest_date).getTime() / 1000;
    date_unix=new Date(data.date).getTime() / 1000;
    }
    if(data.date && data.period && date_unix<=latest_unix){
      if(data.period==="week"){
        this.display_error=false;
        this.displaymonthchart=false;
        this.displayweekchart=true;
        this.display_count=true;
        this.wbcs.wc_calender(this.access_token,this.ig_id,data.date,data.period).subscribe((res)=>{
          console.log("response clicks=",res)
          let len = Object.entries(res)[0][1][0].values.length;
          //console.log(len);
          this.wcs_count=0;
          let i=0,time="",date="",month="";
          for(i=0;i<len;i++){
            this.wcs_count=this.wcs_count+Object.entries(res)[0][1][0].values[i].value;
            if (this.lineChartDataweek.datasets) {
            this.lineChartDataweek.datasets[0].data[i] = Object.entries(res)[0][1][0].values[i].value;
            }
            //console.log(Object.entries(res)[0][1][0].values[i].end_time);
            time=Object.entries(res)[0][1][0].values[i].end_time;
            date=time.substring(8,10);
            month=time.substring(5,7);
            if(month==="01"){this.date={"1":date+" "+"Jan"};this.date_array_week[i]=this.date;}else if(month==="02"){this.date={"2":date+" "+"Feb"};this.date_array_week[i]=this.date;}else if(month==="03"){this.date={"3":date+" "+"March"};this.date_array_week[i]=this.date;}else if(month==="04"){this.date={"4":date+" "+"April"};this.date_array_week[i]=this.date;}else if(month==="05"){this.date={"5":date+" "+"May"};this.date_array_week[i]=this.date;}else if(month==="06"){this.date={"6":date+" "+"June"};this.date_array_week[i]=this.date;}else if(month==="07"){this.date={"7":date+" "+"July"};this.date_array_week[i]=this.date;}else if(month==="08"){this.date={"8":date+" "+"Aug"};this.date_array_week[i]=this.date;}else if(month==="09"){this.date={"9":date+" "+"Sept"};this.date_array_week[i]=this.date;}else if(month==="10"){this.date={"i":date+" "+"Oct"};this.date_array_week[i]=this.date;}else if(month==="11"){this.date={"i":date+" "+"Nov"};this.date_array_week[i]=this.date;}else if(month==="12"){this.date={"12":date+" "+"Dec"};this.date_array_week[i]=this.date;}
          }
          this.chart?.update();
          console.log("Total clicks=",this.wcs_count)
          let j=0;
          this.data_array_w=Object.entries(this.date_array_week);
          //console.log(this.data_array_w);
          if (this.lineChartDataweek.labels) {
          //this.lineChartData.labels = [];
          for(j=0;j<7;j++){
            this.lineChartDataweek.labels[j] = [Object.entries(this.data_array_w[j][1])[0][1]];
          }
          }
            this.chart?.update();
          this.wbcs.wc_calender_p(this.access_token,this.ig_id,data.date,data.period).subscribe((response)=>{
            console.log("response clicks previous=",response)
            let len = Object.entries(response)[0][1][0].values.length;
            console.log(len);
            let i=0;
            this.wcs_p=0;
            for(i=0;i<len;i++){
            this.wcs_p=this.wcs_p+Object.entries(response)[0][1][0].values[i].value;  
              console.log("wbcs_p",Object.entries(response)[0][1][0].values[i].value);
             }
            console.log("total clicks_p",this.wcs_p);
        this.wcs_percentage_change=<any>(((this.wcs_count-this.wcs_p)/this.wcs_p)*100).toFixed(2);
        if(this.wcs_p===0){
            this.wcs_percentage_change='--';
        }
          });
          });
      }
      else if(data.period==="month"){
        this.display_error=false;
        this.displaymonthchart=true;
        this.displayweekchart=false;
        this.display_count=true;
        this.wbcs.wc_calender(this.access_token,this.ig_id,data.date,data.period).subscribe((res)=>{
          console.log("response clicks=",res)
          let len = Object.entries(res)[0][1][0].values.length;
          //console.log(len);
          this.wcs_count=0;
          let i=0,time="",date="",month="";
          for(i=0;i<len;i++){
            this.wcs_count=this.wcs_count+Object.entries(res)[0][1][0].values[i].value;
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
          console.log("Total clicks=",this.wcs_count)
          let j=0;
          this.data_array_w=Object.entries(this.date_array_week);
          //console.log(this.data_array_w);
          if (this.lineChartDatamonth.labels) {
          //this.lineChartData.labels = [];
          for(j=0;j<30;j++){
            this.lineChartDatamonth.labels[j] = [Object.entries(this.data_array_w[j][1])[0][1]];
          }
          }
            this.chart?.update();
          this.wbcs.wc_calender_p(this.access_token,this.ig_id,data.date,data.period).subscribe((response)=>{
            console.log("response clicks previous=",response)
            let len = Object.entries(response)[0][1][0].values.length;
            console.log(len);
            let i=0;
            this.wcs_p=0;
            for(i=0;i<len;i++){
            this.wcs_p=this.wcs_p+Object.entries(response)[0][1][0].values[i].value;  
              console.log("wbcs_p",Object.entries(response)[0][1][0].values[i].value);
             }
            console.log("total clicks_p",this.wcs_p);
        this.wcs_percentage_change=<any>(((this.wcs_count-this.wcs_p)/this.wcs_p)*100).toFixed(2);
        if(this.wcs_p===0){
            this.wcs_percentage_change='--';
        }
          });
          });
      }
    }
    else if(date_unix>latest_unix){
      this.display_error=true;
      this.display_count=false;
      this.error="future date cannot be selected";
      this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
    }
    else{
      this.display_error=true;
      this.display_count=false;
      this.error="Both the fields must be filled";
      this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
    }
  }
}
