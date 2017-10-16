import { Injectable } from '@angular/core';
import { Http, Headers, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
  /*
  Generated class for the HttpCallService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpCallService {

  public baseUrl = "http://vahano.hurix.com";
  //public baseUrl = "http://172.18.14.169/vahano";
  
  public sessionValue:any = "";

  constructor(public http: Http) {
   // console.log('Hello HttpCallService Provider');
   
  }

  init(){
    
  }

  postData(credentials, type, headers) {


    let self = this;
    return new Promise((resolve, reject) => {   
      //console.log(JSON.stringify(credentials));
      //this.http.post(type, JSON.stringify(credentials), {headers: headers})
      let createdUrl = "https://jsonplaceholder.typicode.com/"+credentials;
      this.http.get(createdUrl)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    }); 
  } 

}
