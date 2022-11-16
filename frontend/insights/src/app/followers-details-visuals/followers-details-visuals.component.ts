import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FollowersDetailsService } from '../followers-details.service';
import { ProfilevisitsService } from '../profilevisits.service';
import { WbcsService } from '../wbcs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers-details-visuals',
  templateUrl: './followers-details-visuals.component.html',
  styleUrls: ['./followers-details-visuals.component.css', '../dashboard/dashboard.component.css']
})
export class FollowersDetailsVisualsComponent implements OnInit {
  prv: any;
  date: object = { 0: "date" };
  date_array_week: Array<Object> = [{ "0": "date" }];
  data_array_w: any = "r";
  pv_labels_week: Array<String> = [""];
  prv_p: any;
  prv_percentage_change: any;
  wcs: any;
  wcs_p: any;
  wcs_percentage_change: any;
  toDisplay_country = false;
  toDisplay_gender = false;
  toDisplay_age = false;
  toDisplay_city = true;
  toDisplay_details = false;

  constructor(private router : Router,private prfvisits: ProfilevisitsService, private wbcs: WbcsService, private fd_service: FollowersDetailsService) {
    this.access_token = localStorage.getItem("access_token");
    this.ig_id = localStorage.getItem("ig_id");
    this.fd_city();
  }

  ngOnInit(): void {
  }
  doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Visits',
        backgroundColor: [
          '#3B00ED','#9C27B0','#D81B60','#FF9800','#C0CA33','#B2BEB5'
        ]
      }
    ],
    labels: [],
  }

  public doughnutChartType: ChartType = 'doughnut';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  access_token: any;
  ig_id: any;

  select_details() {
    console.log(this.toDisplay_details);
    this.toDisplay_details = !this.toDisplay_details;
  }

  fd_city() {
    this.toDisplay_details = false;
    this.toDisplay_country = false;
    this.toDisplay_gender = false;
    this.toDisplay_age = false;
    this.toDisplay_city = true;
    let i;
    this.fd_service.city(this.access_token, this.ig_id).subscribe((res: any) => {
      let obj=res.data[0].values[0].value;
      let length=Object.keys(obj).length;
      let fieldValues = res.data[0].values[0].value;
      let filedlabels = Object.keys(res.data[0].values[0].value);
      let keys = Object.keys(res.data[0].values[0].value);
      this.doughnutChartData.labels = [];
      for (i = 0; i < length; i++) {
        console.log("city", Object.keys(res.data[0].values[0].value)[i]);
        console.log("city values", keys.map(k => fieldValues[k])[i]);
        if (this.doughnutChartData.datasets) {
          if(i<5){
            this.doughnutChartData.datasets[0].data[i] = keys.map(k => fieldValues[k])[i];
            this.doughnutChartData.labels[i] = [Object.keys(res.data[0].values[0].value)[i]];
            this.doughnutChartData.datasets[0].data[5]=0;
          }
          else{
            this.doughnutChartData.datasets[0].data[5] =this.doughnutChartData.datasets[0].data[5] + keys.map(k => fieldValues[k])[i];
            this.doughnutChartData.labels[5] = "others";
          }
        }
      }
      this.chart?.update();
    });
  }
  fd_country() {
    this.toDisplay_details = false;
    this.toDisplay_country = true;
    this.toDisplay_gender = false;
    this.toDisplay_age = false;
    this.toDisplay_city = false;
    let i;
    this.fd_service.country(this.access_token, this.ig_id).subscribe((res: any) => {
      let obj=res.data[0].values[0].value;
      let length=Object.keys(obj).length;
      let fieldValues = res.data[0].values[0].value;
      let filedlabels = Object.keys(res.data[0].values[0].value);
      let keys = Object.keys(res.data[0].values[0].value);
      this.doughnutChartData.labels = [];
      for (i = 0; i < length; i++) {
        console.log("city", Object.keys(res.data[0].values[0].value)[i]);
        console.log("city values", keys.map(k => fieldValues[k])[i]);
        if (this.doughnutChartData.datasets) {
          if(i<5){
            this.doughnutChartData.datasets[0].data[i] = keys.map(k => fieldValues[k])[i];
            this.doughnutChartData.labels[i] = [Object.keys(res.data[0].values[0].value)[i]];
            this.doughnutChartData.datasets[0].data[5]=0;
          }
          else{
            this.doughnutChartData.datasets[0].data[5] =this.doughnutChartData.datasets[0].data[5] + keys.map(k => fieldValues[k])[i];
            this.doughnutChartData.labels[5] = "others";
          }
        }
      }
      this.chart?.update();
    });
  }
  fd_gender() {
    this.toDisplay_details = false;
    this.toDisplay_country = false;
    this.toDisplay_gender = true;
    this.toDisplay_age = false;
    this.toDisplay_city = false;
    let i;
    this.fd_service.gender_age(this.access_token, this.ig_id).subscribe((res: any) => {
      let obj=res.data[0].values[0].value;
      let length=Object.keys(obj).length;
      let fieldValues = res.data[0].values[0].value;
      let filedlabels = Object.keys(res.data[0].values[0].value);
      let keys = Object.keys(res.data[0].values[0].value);
      this.doughnutChartData.labels = [];
      for (i = 0; i < length; i++) {
        console.log("gender age", Object.keys(res.data[0].values[0].value)[i]);
        console.log("gender age values", keys.map(k => fieldValues[k])[i]);
        if (this.doughnutChartData.datasets) {
          if(i<5){
            this.doughnutChartData.datasets[0].data[i] = keys.map(k => fieldValues[k])[i];
            this.doughnutChartData.labels[i] = [Object.keys(res.data[0].values[0].value)[i]];
            this.doughnutChartData.datasets[0].data[5]=0;
          }
          else{
            this.doughnutChartData.datasets[0].data[5] =this.doughnutChartData.datasets[0].data[5] + keys.map(k => fieldValues[k])[i];
            this.doughnutChartData.labels[5] = "others";
          }
        }
      }
      this.chart?.update();
    });
  }
  city_details(){
      this.router.navigate(['/followers-details','city']);
  }
  country_details(){
    this.router.navigate(['/followers-details','country']);
  }
  gender_details(){
    this.router.navigate(['/followers-details','gender_age']);
  }
}
