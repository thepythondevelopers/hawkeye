import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NewpostService } from '../newpost.service';

@Component({
  selector: 'app-newpost-calender',
  templateUrl: './newpost-calender.component.html',
  styleUrls: ['./newpost-calender.component.css','../reach-calender/reach-calender.component.css']
})
export class NewpostCalenderComponent implements OnInit {
  nps_count: any;
  error:string="";
  display_error:boolean=false;
  display_count:boolean=false;
  unit_change:number=0;
  access_token: any;
  ig_id: any;
  date_in_string:Array<String>=[""];
  constructor(private newpost : NewpostService,private toast:NgToastService) { 
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
  }

  ngOnInit(): void {
  }
  newpostdata(data:any){
    if(data.date && data.period){
    console.log("new post calender data=",data);
    this.display_count=true;
    var dd, mm, yyyy, len, i,wcs=0;
    let present_day=0,yesterday=0, date;
    this.nps_count=0;
    let date_unix=new Date(data.date).getTime() / 1000;
    let latest_date=Math.floor(Date.now() / 1000);
    if(date_unix>latest_date){
      this.display_count=false;
      this.error="future date cannot be selected";
      this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
    }
    else if(date_unix<(latest_date-(365*2*24*60*60))){
      this.display_count=false;
      this.error="Data can be provided up till last 2 years only.";
      this.toast.error({detail:"Failure Message",summary:this.error,duration:5000});
    }
    else{
      if(data.period==="week"){
        for(i=0;i<7;i++){
          date = new Date((date_unix-(i*24*60*60))*1000);
          console.log("date",date);
          dd = String(date.getDate()).padStart(2, '0');
          mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          yyyy = date.getFullYear();
          this.date_in_string[i] = yyyy + '-' + mm + '-' + dd;
        }
        this.newpost.new_post_calender(this.access_token,this.ig_id).subscribe((res)=>{
          console.log("total posts calender",res);
          let len = Object.entries(res)[0][1].length;
          let j, timestamps;
          for(i=0;i<len;i++){
            timestamps=(Object.entries(res)[0][1][i].timestamp.substring(0,10));
            for(j=0;j<7;j++){
              //console.log("dates in the array=",this.date_in_string[1]);
              if(this.date_in_string[j]===timestamps){
                this.nps_count++;
                if(data.date===timestamps){
                  present_day++;
                  console.log("present day=",present_day);
                }
                else if(this.date_in_string[1]===timestamps){
                  yesterday++;
                  console.log("yesterday date=",timestamps);
                }
              }
            }
          }
          this.unit_change=(present_day-yesterday);
        });
      }
      if(data.period==="month"){
        for(i=0;i<30;i++){
          date = new Date((date_unix-(i*24*60*60))*1000);
          console.log("date",date);
          dd = String(date.getDate()).padStart(2, '0');
          mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
          yyyy = date.getFullYear();
          this.date_in_string[i] = yyyy + '-' + mm + '-' + dd;
        }
        this.newpost.new_post_calender(this.access_token,this.ig_id).subscribe((res)=>{
          console.log("total posts calender",res);
          let len = Object.entries(res)[0][1].length;
          let j, timestamps;
          present_day=0;
          yesterday=0;
          for(i=0;i<len;i++){
            timestamps=(Object.entries(res)[0][1][i].timestamp.substring(0,10));
            for(j=0;j<30;j++){
              if(this.date_in_string[j]===timestamps){
                this.nps_count++;
                if(data.date===timestamps){
                  present_day++;
                  console.log("present day=",present_day);
                }
                else if(this.date_in_string[1]===timestamps){
                  yesterday++;
                  console.log("yesterday date=",timestamps);
                }
              }
            }
          }
          this.unit_change=(present_day-yesterday);
        });
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
