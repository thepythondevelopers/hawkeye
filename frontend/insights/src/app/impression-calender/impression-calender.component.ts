import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DatePipe } from '@angular/common'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-impression-calender',
  templateUrl: './impression-calender.component.html',
  styleUrls: ['./impression-calender.component.css','../reach-calender/reach-calender.component.css'],
  providers: [DatePipe]
})
export class ImpressionCalenderComponent implements OnInit {
  access_token: any;
  ig_id: any;
  reach_count:number=0;
  reach_count_p:number=0;
  date:any;
  reach_pc:number=0;
  error:string="";
  display_error:boolean=false;
  display_count:boolean=false;
  constructor(private dashboardservice: DashboardService,private datepipe: DatePipe,private toast:NgToastService) { 
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
  }

  ngOnInit(): void {
  }
  impdata(data:any){
    if(data.date && data.period){
      this.date=new Date();
      let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
      if(latest_date){
        let latest_unix=new Date(latest_date).getTime() / 1000;
        let date_unix=new Date(data.date).getTime() / 1000;
        if(date_unix>latest_unix){
          this.display_error=true;
          this.display_count=false;
          this.error="future date cannot be selected";
          this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
        }
        else if(date_unix<(latest_unix-(365*2*24*60*60))){
          this.display_error=true;
          this.display_count=false;
          this.error="Data can be provided up till last 2 years only.";
          this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
        }
        else{
          this.display_error=false;
          this.display_count=true;
          console.log("date=",data.date,"period=",data.period);
        this.dashboardservice.imp_calender(this.access_token,this.ig_id,data.date,data.period).subscribe((res)=>{
          console.log("this week response=",res);
          this.reach_count=0;
          for(let i=0;i<Object.entries(res)[0][1][0].values.length;i++){
            this.reach_count=this.reach_count+Object.entries(res)[0][1][0].values[i].value;
          }
          //console.log("reach count=",this.reach_count);
          console.log("reach=",this.reach_count);
          this.dashboardservice.imp_calender_p(this.access_token,this.ig_id,data.date,data.period).subscribe((response)=>{
            console.log("previous week response=",response);
            this.reach_count_p=0;
            for(let i=0;i<Object.entries(response)[0][1][0].values.length;i++){
              this.reach_count_p=this.reach_count_p+Object.entries(response)[0][1][0].values[i].value;
            }
            //console.log("reach count previous week=",this.reach_count_p);
            this.reach_pc=0;
            console.log("reach previous=",this.reach_count_p);
            this.reach_pc=<any>(((this.reach_count-this.reach_count_p)/this.reach_count_p)*100).toFixed(2);
          })
        })
        }
      }
    }
    else{
      this.display_error=true;
      this.error="Filling both the data is neccessary";
      this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
    }
  }
}
