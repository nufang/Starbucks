import { Component } from '@angular/core';
import { IonicPage, App, NavParams } from 'ionic-angular';

import { LoginService } from '@/../../src/service/LoginService';

@IonicPage()
@Component({
  selector: 'page-order-undo',
  templateUrl: 'order-undo.html',
})
export class orderUndoPage {
  data: any;
  navCtrl: any;
  userInfo: any;
  constructor(
    public app: App,
    public navParams: NavParams,
    public login: LoginService
  ) {
    this.userInfo = this.login.userInfo;
    this.navCtrl = this.app.getRootNav();
    this.data = navParams.get('data');
    console.log(this);
  }
  goToOtherPage(name: string) {
    this.navCtrl.push(name);
  }

  goToDetailPage(name) {
    this.navCtrl.push(name);
  }

}
