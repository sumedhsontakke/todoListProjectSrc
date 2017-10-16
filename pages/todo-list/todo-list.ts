import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpCallService } from "../../providers/http-call-service"
import { Database } from '../../providers/database';
/**
 * Generated class for the TodoListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {
  item:any;
  todoList:any = [];
  add:any = "";
  wholeObj: any;
  dbUniqueId:any;
  constructor(public database: Database, public navCtrl: NavController, public navParams: NavParams, public httpCallService:HttpCallService, public loadingController: LoadingController) {
    this.item = navParams.get("obj");
    console.log(this.item);
    this.loadData(this.item.id);
  }

  addNewTodo(){
    console.log("data", this.add);
    //get last obj
    let temp = this.wholeObj.data.length;
    let obj  = {"completed": false, "id" : this.wholeObj.data[temp - 1].id, "title" : this.add, "userId": this.item.id};
    //obj = this.wholeObj[temp - 1].id;
    //insert into temp array
    this.todoList.unshift(obj);

    //insert into local db;
    this.wholeObj.data.push(obj);
    //select db
    this.database.userdb();    
    this.database.update(this.wholeObj._id, this.wholeObj)

    this.add = "";
    let loader = this.loadingController.create({
      content: "Todo added successfully",
      spinner:"hide",        
      duration: 2000
    });
    loader.present();        
  }

  loadData(id){

    //get todo list by user
    //select db
    this.database.userdb();

    //get data 
    this.database.getAll().then((data)=>{
      console.log("DATA FOUND",data);

      //this.dbUniqueId = data["rows"][0].doc._id;

      this.wholeObj = data["rows"][0].doc;
      for(let i=0; i < data["rows"][0].doc.data.length; i++){
        if(data["rows"][0].doc.data[i].userId == id){
          this.todoList.push(data["rows"][0].doc.data[i]);
        }
      }
    }, (err)=>{
      console.log("something went wrong.. while fetching datafrom local db");
    })
  }  

  updateDb(value){
    console.log(value);
    this.wholeObj.data = value;
    this.database.update(this.wholeObj._id, this.wholeObj);
    let loader = this.loadingController.create({
      content: "Status Updated successfully",
      spinner:"hide",        
      duration: 2000
    });
    loader.present();       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
  }

}
