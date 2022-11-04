import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentreachService {
  feed: any;

  constructor(private http: HttpClient) { }
  rp(id:any){
    console.log(id);
    let media_product_type = 'https://graph.facebook.com/v15.0/' + id + '?fields=media_product_type&access_token=EAAJI21EvdxwBADR5trfUDCT2eB4c2ekHLMSGonEVKWYs9JZBwNRz9qlsZB3KEx9rZA46FVcSkgDmz5avkLUAXheo3SNDqPa4VgkaZBARGquVWqRyQVwbYqBDgVTbzugod2NwPEyoDnfmiS4MxgdkXEZBZC8w72Az9rGoqZAdcOo9UbwziiZBOWLZCjJVwHAvmgVcl0y8bl08mAgZDZD';
    this.http.get(media_product_type).subscribe((res: any) => {
      console.log(res.media_product_type);
      if (res.media_product_type === "FEED") {
        return this.http.get('https://graph.facebook.com/v15.0/'+id+'/insights?metric=reach&access_token=EAAJI21EvdxwBADR5trfUDCT2eB4c2ekHLMSGonEVKWYs9JZBwNRz9qlsZB3KEx9rZA46FVcSkgDmz5avkLUAXheo3SNDqPa4VgkaZBARGquVWqRyQVwbYqBDgVTbzugod2NwPEyoDnfmiS4MxgdkXEZBZC8w72Az9rGoqZAdcOo9UbwziiZBOWLZCjJVwHAvmgVcl0y8bl08mAgZDZD');
      }
      if (res.media_product_type === "REELS") {
        return this.http.get('https://graph.facebook.com/v15.0/'+id+'/insights?metric=reach&access_token=EAAJI21EvdxwBADR5trfUDCT2eB4c2ekHLMSGonEVKWYs9JZBwNRz9qlsZB3KEx9rZA46FVcSkgDmz5avkLUAXheo3SNDqPa4VgkaZBARGquVWqRyQVwbYqBDgVTbzugod2NwPEyoDnfmiS4MxgdkXEZBZC8w72Az9rGoqZAdcOo9UbwziiZBOWLZCjJVwHAvmgVcl0y8bl08mAgZDZD');
      }
      else{
        return({"error":"The post was made before account converted to bussiness or creator account"});
      }
    });
  }
}
