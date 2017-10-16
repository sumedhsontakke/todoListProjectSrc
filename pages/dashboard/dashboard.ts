import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpCallService } from "../../providers/http-call-service"
import { TodoListPage } from "../../pages/todo-list/todo-list"
/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  users:any;
  constructor(public loadingController: LoadingController,public navCtrl: NavController, public navParams: NavParams, public httpCallService: HttpCallService) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  loadData(){
    let loader = this.loadingController.create({
      content: "Please wait.",
    });
    loader.present();       
    this.httpCallService.postData("users", {}, Headers)
    .then((data)=>{
      loader.dismiss();
      this.users = data;
    },(err)=>{
      loader.dismiss();
      
    })
  }
  
  userSelect(data){
    this.navCtrl.push(TodoListPage, { "obj": data });
  }
}
