import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { HttpCallService } from '../providers/http-call-service';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Database {

  pouchdbLoaded: boolean;
  idbSupported: boolean;
  websqlSupported: boolean;
  cordovaSqliteSupported: boolean;
  nativeSqlitePluginInstalled: boolean;  

  db:any;

  constructor(public loadingController: LoadingController,public http: Http, public httpCallService: HttpCallService) {
    console.log('Hello Userdb Provider');
    //this.db = new PouchDB("user");

    //check if user todo list is already there
    //select db
    this.userdb();
    this.getAll().then((data)=>{
      console.log("data found",data);
      if(data['total_rows'] == 0){
        let loader = this.loadingController.create({
          content: "Please wait.",
        });
        loader.present();   

        this.httpCallService.postData("todos", {}, Headers)
        .then((data)=>{
          console.log("server data", data);

          //push server data in local db
          this.insert({data:data});
          loader.dismiss();
        },(err)=>{
          loader.dismiss();
        })        
      }
    },(err)=>{
      console.log("data not found");
    })
  }

  userdb(){
   
    this.db = new PouchDB("user");
    this.db.info().then((data)=>{
       console.log("user db initiated", data); 
    })
  }


  getWhere(doc){
    return new Promise((resolve, reject) => {
      //Inserting Document
      this.db.get(doc, function(err, response) {
        if (err) {
            return reject(err);
        } else {
            return "inserted";
        }
      }); 
    });
  }

  getAll(){
    return new Promise((resolve, reject) => {
      //Inserting Document
      this.db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        resolve(result);
      }).catch(function (err) {
         reject(err);
      });
    });
  }

  insert(doc){
    doc._id = (new Date().valueOf()).toString();
    return new Promise((resolve, reject) => {
      //Inserting Document
      this.db.put(doc, function(err, response) {
        if (err) {
            reject(err);
        } else {
            resolve("inserted");
        }
      }); 
    });
  }

  //doc is unique _id and datatoupdate is object
  update(doc, datatoupdate){
    return new Promise((resolve, reject) => {
      let self = this;      
      this.db.get(doc).then(function(value) {
        datatoupdate._rev = value._rev;
        return self.db.put(
          datatoupdate
        );
      }).then(function(response) {
        resolve(response);
      }).catch(function (err) {
        reject(err);
      });
    });  
  }

  delete(){
    let db = this.db;
    return new Promise((resolve, reject) => {
      db.allDocs().then(function (result) {
        // Promise isn't supported by all browsers; you may want to use bluebird
        return Promise.all(result.rows.map(function (row) {
          return db.remove(row.id, row.value.rev);
        }));
      }).then(function () {
        resolve(true);
      }).catch(function (err) { console.log(err);
        reject(err);
      });
    });
  }

  deleteDoc(mydoc){
    let db = this.db;
    return new Promise((resolve, reject) => {
      db.get(mydoc).then(function(doc) {
        return db.remove(doc);
      }).then(function (result) {
        resolve(true);
      }).catch(function (err) {
        console.log(err);
        reject(err);
      });
    })
  } 

}
