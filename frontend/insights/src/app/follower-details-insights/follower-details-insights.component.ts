import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersDetailsService } from '../followers-details.service';
@Component({
  selector: 'app-follower-details-insights',
  templateUrl: './follower-details-insights.component.html',
  styleUrls: ['./follower-details-insights.component.css']
})
export class FollowerDetailsInsightsComponent implements OnInit {
  detail:String="";
  access_token: any;
  ig_id: any;
  cities: any;
  genders: any;
  countries: any;
  gender_age: boolean = false;
  country: boolean = false;
  city: boolean = false;
  constructor(private fd_service: FollowersDetailsService,private route: ActivatedRoute) {
    this.access_token = localStorage.getItem("access_token");
    this.ig_id = localStorage.getItem("ig_id");
    this.insights()
   }

  ngOnInit(): void {
  }
  insights(){
    this.route.params.subscribe(params => {
      this.detail = params['id'];
      if(this.detail==="city"){
        this.city=true;
        this.country=false;
        this.gender_age=false;
        this.fd_service.city(this.access_token, this.ig_id).subscribe((res: any) => {
          this.cities=Object.entries(res.data[0].values[0].value);
          console.log("cities=",this.cities)
        })
      }
      else if(this.detail==="country"){
        this.country=true;
        this.city=false;
        this.gender_age=false;
        this.fd_service.country(this.access_token, this.ig_id).subscribe((res: any) => {
          this.countries=Object.entries(res.data[0].values[0].value);
          console.log("country=",this.countries)
        })
      }
      else if(this.detail==="gender_age"){
        this.gender_age=true;
        this.city=false;
        this.country=false;
        this.fd_service.gender_age(this.access_token, this.ig_id).subscribe((res: any) => {
          this.genders=Object.entries(res.data[0].values[0].value);
          console.log("gender_Age=",this.genders)
        })
      }
    });
  }
}
