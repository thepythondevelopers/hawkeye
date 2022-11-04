import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LscsService {

  constructor(private http: HttpClient, private router : Router) { }
  saved(id:any){
    /*let url = 'https://graph.facebook.com/v15.0/'+id+'/insights?metric=saved&access_token=EAAJI21EvdxwBAJmOlO7IwONDCmL7TWSw9cLBbwZAFeydtQN4DRM8h4nAtoYlehHmy9IT40GkVobUUeoeSyTLg27R51WxZAMqjutxGZAZBz6vRTT6k2xqn9c86pegrGPIdCyOT7FZBWiZALPVDZCZAtxuXlueZBpZCo8XHLijPJ0zDcmPufuwJbVBP6eEOlKdWglXCkFmWEzWew8Q731Do2tK1O';
    console.log(url);
    this.http.get(url).subscribe(result=>{
          var i,saved=0;
      saved= saved + Object.entries(result)[0][1][0]["values"][0].value;
      return saved;
    }
    )*/
  }
  shared(id:any){
    /*let url = 'https://graph.facebook.com/v15.0/'+id+'/insights?metric=shares&access_token=EAAJI21EvdxwBAJmOlO7IwONDCmL7TWSw9cLBbwZAFeydtQN4DRM8h4nAtoYlehHmy9IT40GkVobUUeoeSyTLg27R51WxZAMqjutxGZAZBz6vRTT6k2xqn9c86pegrGPIdCyOT7FZBWiZALPVDZCZAtxuXlueZBpZCo8XHLijPJ0zDcmPufuwJbVBP6eEOlKdWglXCkFmWEzWew8Q731Do2tK1O';
    console.log(url);
    this.http.get(url).subscribe(result=>{
          var i,shares=0;
      shares= shares + Object.entries(result)[0][1][0]["values"][0].value;
      return shares;
    }
    )*/
  }
  like(access_token:any,ig_id:any){
    let tl_url='https://graph.facebook.com/v8.0/'+ig_id+'/media?fields=like_count&limit=36500000&access_token='+access_token;
    return this.http.get(tl_url);
  }
  comment(access_token:any,ig_id:any){
    /*this.http.get('https://graph.facebook.com/v8.0/17841437251182054/media?fields=comments_count&limit=36500000&access_token=EAAJI21EvdxwBAArqxbS8jig24eZC6vUJyxaO0lR48I3eEXlKyrEPI6KI0bqpeTf9oEhW5037jBLn5q5zYFUS9FsSArR2AxWxwf1BKmkfIk8mRdvvCZBdYhrMkq23gTRHt78QGrrMMEPZAKZBgX5GgkwZAJb9j22U3BO68ZBMYtNx4ZCZCzyfAc2J4xdAEUxOclJasbZBp0J1aFwZDZD').subscribe((res)=>{
    //console.log(Object.entries(res));
    //console.log(Object.entries(res)[0][1].length);
    let len = Object.entries(res)[0][1].length;
    //console.log(len);
    var i,comment=0;
    for(i=0;i<len;i++){
      comment= comment + Object.entries(res)[0][1][i].comments_count;
    }
    console.log("Total Comments = ",comment);
    });*/
  }
}