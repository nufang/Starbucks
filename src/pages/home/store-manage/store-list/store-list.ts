import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavParams, Content } from 'ionic-angular';

import { HttpService } from '../../../../service/HttpService';
import { RES_ROOT } from '../../../../providers/httpUrl';

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'store-list.html',
})
export class StoreManageListPage {

  @ViewChild(Content) content: Content;


  storeList: Array<any> = [];
  store: Object[] = [];
  navCtrl: any;
  status: number;
  RES_ROOT: string;

  constructor(
    public navParams: NavParams,
    public app: App,
    public http: HttpService
  ) {
    this.getData();
    this.navCtrl = this.app.getRootNav();
    this.RES_ROOT = RES_ROOT;
  }

  getData() {
    var params = { method: "store.findStoreInfoByStaff" };
    this.http.get(params).subscribe(res => {
      if (!!res && res.responseCode == 157060) {
        this.storeList = res.responseObj;
        for (let i = 0; i < this.storeList.length; i++) {
          this.store.push({
            id: this.storeList[i].id,
            name: this.storeList[i].storeName,
            url: this.storeList[i].shopPhotoList[0]
          });
        }
      };
    }, error => {

    });

  }
  goToOtherPage(item) {
    this.navCtrl.push('StoreIndexPage', {
      storeInfoId: item ? item.id : 0
    });
  }

  tabs(n: number) {
    this.status = this.status == n ? 0 : n;
  }
}
