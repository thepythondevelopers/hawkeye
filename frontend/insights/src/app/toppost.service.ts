import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToppostService {
  
  constructor(private http: HttpClient) {}
  top(id: any) {
    let media_product_type = 'https://graph.facebook.com/v15.0/' + id + '?fields=media_product_type&access_token=EAAJI21EvdxwBAIeJQCO9iRvGVK7AojlL7TI9JlvFzVSqDWQdWQP0fM0k2GWEmxVEHzFbS1NNkkoitZCz4TGZC8KVVWK1nwoVcmFdrcMxfuJup3ImH8AJ86FZB8vDmnNlzk4jQQaGyJK6A6pN3yq4hDSPJVFaeLUrEQ9nMK8pDxNZAZA5wRbMyjLWwAnuo5fW10rGuT3aR7UiUYoshV8Lm';
    this.http.get(media_product_type).subscribe((res: any) => {
      console.log(res.media_product_type);
      if (res.media_product_type === "FEED") {
        let saved_api_ig = 'https://graph.facebook.com/v15.0/' + id + '/insights?metric=saved&access_token=EAAJI21EvdxwBAIeJQCO9iRvGVK7AojlL7TI9JlvFzVSqDWQdWQP0fM0k2GWEmxVEHzFbS1NNkkoitZCz4TGZC8KVVWK1nwoVcmFdrcMxfuJup3ImH8AJ86FZB8vDmnNlzk4jQQaGyJK6A6pN3yq4hDSPJVFaeLUrEQ9nMK8pDxNZAZA5wRbMyjLWwAnuo5fW10rGuT3aR7UiUYoshV8Lm';
        this.http.get(saved_api_ig).subscribe((res: any) => {
          let saved_ig = res.data[0].values[0].value;
          console.log((res.data[0].values[0].value));
          if(res.data[0].values[0].value>0){
          let a = res.data[0].values[0].value;
          }

        });
      }
    });
  }
}
