import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileImageService } from '../profile-image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','../dashboard/dashboard.component.css']
})
export class NavbarComponent implements OnInit {
  toDisplay_dropdown_beside_profile=false;
  profile_image: any;
  base64String:any;
  constructor(private router: Router,private pis: ProfileImageService) { 
    this.pis.get_profile_image().subscribe((res)=>{
      this.profile_image=Object.entries(res)[0][1];
      console.log("response from get image=",Object.entries(res)[0][1].data.data);
      this.base64String=btoa(
        String.fromCharCode(...new Uint8Array((Object.entries(res)[0][1].data.data)))
        );
      this.base64String="data:image/png;base64,"+this.base64String;
      //console.log("base url64=",this.base64String);
    })
  }

  ngOnInit(): void {
  }
  dropdown_beside_profile(){
    this.toDisplay_dropdown_beside_profile=!this.toDisplay_dropdown_beside_profile;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/signup']);
  }
  profile(){
    
  }
}
