import { Component } from '@angular/core';
import { IonicPage, App, NavParams } from 'ionic-angular';

import { ToastService } from '@/../../src/service/ToastService';
import { HttpService } from '@/../../src/service/HttpService';
import { LoginService } from '@/../../src/service/LoginService';
import { RoleTypeService } from '@/../../src/service/RoleTypeService';

@IonicPage()
@Component({
    selector: 'page-order-done',
    templateUrl: 'order-done.html',
})
export class OrderDonePage {

    data: any;
    list: Array<any> = [];

    RES_ROOT: string;
    tabStatus: number = 0;
    navCtrl: any;
    roleType: any;

    constructor(
        public app: App,
        public navParams: NavParams,
        public toast: ToastService,
        public login: LoginService,
        public http: HttpService,
        public role: RoleTypeService
    ) {
        this.data = this.navParams.get('data');
        this.navCtrl = this.app.getRootNav();
        console.log(this);

        this.role.setUserRole(val => {
            this.roleType = val;
        });
        this.material();
        this.hours();
    }
    material() {
        let params = { method: 'repair.findStoreRepairOrderGoods' }
        this.http.get(params).subscribe(res => {
            if (!!res && res.responseCode == 167050) {
                this.list = res.responseObj;
            }
        });
    }
    hours() {
        let params = { method: 'repair.reportMaintenanceHours' }
        this.http.get(params).subscribe(res => {
            if (!!res && res.responseCode == 167050) {
                this.list = res.responseObj;
            }
        });
    }
    tabs(i: number) {
        this.tabStatus = i;
    }
    goToOtherPage(name) {
        this.navCtrl.push(name);
    }
    goToDetailPage(event) {
        this.navCtrl.push('ProblemDetailPage');
    }

}
