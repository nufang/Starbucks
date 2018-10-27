import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App, LoadingController } from 'ionic-angular';
import { HttpService } from '../../../service/HttpService';
import { BaseUI } from '../../../directives/comm/baseui';
import { ToastService } from '../../../service/ToastService';

import { LoginService } from '../../../service/LoginService';

@Component({
  selector: 'order-point',
  templateUrl: 'order-point.html'
})

export class OrderPointTmpl extends BaseUI {

  @Input() retract: Boolean = true;
  @Input() done: Boolean = true;
  @Input() listdata: any = {};
  @Input() detail: Boolean = true;

  @Output() goto = new EventEmitter<any>();

  navCtrl: any;
  currentAccount: any;

  constructor(
    public app: App,
    public loadingCtrl: LoadingController,
    public http: HttpService,
    public toast: ToastService,
    public login: LoginService
  ) {
    super();
    this.currentAccount = this.login.userInfo['currentAccount'];
    this.navCtrl = this.app.getRootNav();
  }

  goToOtherPage(name) {
    if (name === "OrderImgDetailPage" || !this.done) {
      this.goto.emit(name);
    }
  }
  deleteStoreRepairOrder() {
    let loading = super.showLoading(this.loadingCtrl),
      len = 1,
      startIndex = this.navCtrl.getViews().length - len,
      params = { method: "repair.deleteStoreRepairOrderById", ids: [this.listdata.id] };

    this.http.get(params).subscribe(res => {
      loading.dismiss();
      if (res.responseCode == "167040") {
        this.toast.info("撤销成功！", () => this.navCtrl.push("RepairListPage", { remove: true, len: 2 }));
      }
      if (res.responseCode == "167042") {
        this.toast.info("撤销异常，请稍后再试！");
      }
    });
  }
}