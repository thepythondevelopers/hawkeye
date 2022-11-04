import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaidService {

  constructor(private http: HttpClient) { }

  m_id(){
    return this.http.get('https://graph.facebook.com/v8.0/17841437251182054/media?fields=id&limit=36500000&access_token=EAAJI21EvdxwBAGdIJoWFHcOokerpZBQD2iaJB08FVys4yDi7ZCRdMJbU3It2auPrZCcjYgSmlvvurUlb6l9ZC3ZBfgB49s1OUlNo1ZC3yZCL43hVcxFgdGNmmUOdZAGhxmA1n1xaFEu5FqfXJA0xEBbQYVcty8kiA13puBdr2rCYKvDDUONHAQt9');
  }

}