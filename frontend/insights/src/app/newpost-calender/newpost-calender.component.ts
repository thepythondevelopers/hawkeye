import { Component, OnInit } from '@angular/core';
import { NewpostService } from '../newpost.service';

@Component({
  selector: 'app-newpost-calender',
  templateUrl: './newpost-calender.component.html',
  styleUrls: ['./newpost-calender.component.css']
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
  constructor(private newpost : NewpostService) { 
    this.access_token=localStorage.getItem("access_token");
    this.ig_id=localStorage.getItem("ig_id");
  }

  ngOnInit(): void {
  }
  newpostdata(data:any){
    console.log("new post calender data=",data);
    this.display_count=true;
    var dd, mm, yyyy, len, i,wcs=0;
    let present_day=0,yesterday=0, date;
    this.nps_count=0;
    let date_unix=new Date(data.date).getTime() / 1000;
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
            console.log("dates in the array=",this.date_in_string[1]);
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
