import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, App, NavParams, ToastController, Content } from 'ionic-angular';
import { HttpService } from "../../../service/HttpService";

@IonicPage()
@Component({
    selector: 'page-contact-list',
    templateUrl: 'contact-list.html'
})
export class ContactListPage {

    @ViewChild(Content) content: Content;
    /*搜索的关键字*/
    searchInput: string = '';
    /*请求通讯录的值*/
    contactsUrl: string = './contacts.json';
    /*字母的初始化*/
    aLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    letters: any[] = [];
    formatContacts: any = []; //按首字母顺序格式化后的数组
    searchingItems = []; //搜索显示的数组
    searchLetters = [];
    isSearching: Boolean = false;
    callback: Function;
    toast: any;
    remitBanks: any;
    navCtrl: any;
    status: string = 'ContactListPage';
    RepairUnitList: any[] = [
        { id: 1, status: false },
        { id: 1, status: false },
        { id: 1, status: false }
    ];


    constructor(
        public app: App,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public elementRef: ElementRef,
        private http: HttpService
    ) {
        this.navCtrl = this.app.getRootNav();
        this.getData();
    }
    tabs(name) {
        this.status = name;
    }
    RepairUnitToggle(data) {
        data.status = !data.status;
    }
    getData() {
        this.http.get("assets/data/contacts.json", false).subscribe(res => {
            this.remitBanks = res;
            this.aLetters.forEach((res, index) => {
                if (this.remitBanks[res] && this.remitBanks[res].lenght != 0) {
                    this.formatContacts.push(this.remitBanks[res]);
                    this.letters.push(res);
                }
            })
        }, error => {

        });
    }
    /**
     *取消结果触发的值
     */
    onCancelSearch(event) {
        this.isSearching = false;
        this.searchingItems = [];
    }
    /**
     *定位查找首字母对应的通讯录
     */
    scrollToTop(letter, event) {
        this.show(letter, 1000);
        if (this.elementRef.nativeElement.querySelector(".row-title#" + letter)) {
            let scrollTop = this.elementRef.nativeElement.querySelector(".row-title#" + letter).offsetTop;
            this.content.scrollTo(0, scrollTop, 300);
        }
    }
    /**
     *通过关键字查询搜索的结果值
     */
    goSearchResult(ev: any) {
        this.isSearching = true;
        let val = ev.target.value;
        this.searchInput = val;
        if (val && val.trim() != '') {
            this.searchLetters = [];
            this.searchingItems = [];
            this.letters.forEach((res, index) => {
                let search = this.formatContacts[index].filter((item) => {
                    return (item.userName.indexOf(val) > -1);
                })
                if (search != null && search.length > 0) {
                    this.searchLetters.push(res);
                    this.searchingItems.push(search);
                }
            })
        } else {
            this.isSearching = false;
        }
    }

    goToDetail() {
        this.navCtrl.push('ContactDetailPage');
    }

    ionViewWillEnter() {
        this.callback = this.navParams.get("callback")
    }

    onClear($event) {
        this.searchInput = '';
    }

    show = (message: string = '操作完成', duration: number = 2500) => {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'middle',
            cssClass: 'hj-toast'
        });
        this.toast.present();
    };
}
