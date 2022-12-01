import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css','../success/success.component.css','../login-with-facebook/login-with-facebook.component.css']
})
export class CancelComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  try_again(){
    this._location.back();
  }
}
