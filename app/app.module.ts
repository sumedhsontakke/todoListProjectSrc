import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TodoListPage } from "../pages/todo-list/todo-list"
import { Keyboard } from '@ionic-native/keyboard';
//providers
import { HttpCallService } from '../providers/http-call-service';
import { Database } from '../providers/database';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    TodoListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    TodoListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpCallService,
    Database
  ]
})
export class AppModule {}
