import { Component, OnInit,ViewChild  } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProfilevisitsService } from '../profilevisits.service';
import { WbcsService } from '../wbcs.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-visits-visuals',
  templateUrl: './profile-visits-visuals.component.html',
  styleUrls: ['./profile-visits-visuals.component.css','../dashboard/dashboard.component.css']
})
export class ProfileVisitsVisualsComponent implements OnInit {
  toDisplay_profile_period: any;
  toDisplay_profile_period_30: any;
  toDisplay_profile_period_week: any;
  prv: any;
  date: object={0:"date"};
  date_array_week :Array<Object>=[{"0":"date"}];
  data_array_w: any="r";
  pv_labels_week:Array<String>=[""];
  prv_p: any;
  prv_percentage_change: any;
  wcs: any;
  wcs_p: any;
  wcs_percentage_change: any;

  constructor(private prfvisits : ProfilevisitsService,private wbcs : WbcsService,private router: Router) {
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
    this.pv_week();
   }

  ngOnInit(): void {
  }
  public lineChartData: ChartConfiguration['data'] = {
    datasets:[
      {
        data:[],
        label: 'Visits',
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
        label: 'Visits',
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
  access_token: any;
  ig_id: any;
  
  select_profile_period() {
    this.toDisplay_profile_period = !this.toDisplay_profile_period;
  }
  pv_calender(){
    this.router.navigate(['profile-visits/calender']);
  }
  pv_week(){
    this.toDisplay_profile_period=false;
    this.toDisplay_profile_period_30=false;
    this.toDisplay_profile_period_week=true;
    this.prfvisits.pf_week(this.access_token,this.ig_id).subscribe((res)=>{
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
      //console.log("Total Visits=",this.wcs)
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
        this.prfvisits.pf_week_p(this.access_token,this.ig_id).subscribe((res)=>{
        let len = Object.entries(res)[0][1][0].values.length;
        console.log(len);
        let i=0;
        this.wcs_p=0;
        for(i=0;i<len;i++){
        this.wcs_p=this.wcs_p+Object.entries(res)[0][1][0].values[i].value;  
          console.log("wbcs_p",Object.entries(res)[0][1][0].values[i].value);
         }
        console.log("total Visits_p",this.wcs_p);
    this.wcs_percentage_change=<any>(((this.wcs-this.wcs_p)/this.wcs_p)*100).toFixed(2);
    console.log(this.wcs_percentage_change);
    if(this.wcs_p===0){
        this.wcs_percentage_change='--';
    }
      });
      },
      (error) => {
        let error_message=error.error.error.message.substring(31,50);
        if(error_message==='Session has expired'){
          localStorage.removeItem('auth_token');
          localStorage.removeItem('access_token');
          localStorage.removeItem('ig_id');
          this.router.navigate(['/login-with-facebook']);
        }
      });
  }
  pv_30(){
    this.toDisplay_profile_period=false;
    this.toDisplay_profile_period_week=false;
    this.toDisplay_profile_period_30=true;
    this.prfvisits.pf_30(this.access_token,this.ig_id).subscribe((res)=>{
      let len = Object.entries(res)[0][1][0].values.length;
      //console.log(len);
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
      //console.log("Total Visits=",this.wcs)
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
        this.prfvisits.pf_30_p(this.access_token,this.ig_id).subscribe((res)=>{
        let len = Object.entries(res)[0][1][0].values.length;
        console.log(len);
        let i=0;
        this.wcs_p=0;
        for(i=0;i<len;i++){
        this.wcs_p=this.wcs_p+Object.entries(res)[0][1][0].values[i].value;  
          console.log("wbcs_p",Object.entries(res)[0][1][0].values[i].value);
         }
        console.log("total Visits_p",this.wcs_p);
    this.wcs_percentage_change=<any>(((this.wcs-this.wcs_p)/this.wcs_p)*100).toFixed(2);
    console.log(this.wcs_percentage_change);
    if(this.wcs_p===0){
        this.wcs_percentage_change='--';
    }
      });
      });
  }
}
