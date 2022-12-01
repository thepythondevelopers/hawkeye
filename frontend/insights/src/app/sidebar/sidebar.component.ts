import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../dashboard/dashboard.component.css']
})
export class SidebarComponent implements OnInit {
  toDisplay = false;
  toDisplay_fdo=false;
  toDisplay1 = false;
  toDisplay3 = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  toggleData1() {
    this.toDisplay1 = !this.toDisplay1;
    this.toDisplay_fdo=false;
  }
  toggleData() {
    this.toDisplay = !this.toDisplay;
  }
  toggleData3() {
    this.toDisplay3 = !this.toDisplay3;
  }
  ndp(){
    this.router.navigate(['/dashboard'])
  }
  fdp(){
    this.toDisplay_fdo=!this.toDisplay_fdo;
  }
  idp(){
    this.router.navigate(['/impression/calender'])
  }
  rdp(){
    this.router.navigate(['/reach/calender'])
  }
  npdp(){
    this.router.navigate(['/newpost/calender'])
  }
  wdp(){
    this.router.navigate(['/wbcs/calender'])
  }
  pcdp(){
    this.router.navigate(['/profile-visits/calender'])
  }
  bcity(){
    this.router.navigate(['followers-details/city'])
  }
  bcountry(){
    this.router.navigate(['followers-details/country'])
  }
  bga(){
    this.router.navigate(['followers-details/gender_age'])
  }
}
