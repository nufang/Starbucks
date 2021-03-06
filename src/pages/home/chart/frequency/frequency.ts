import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';
import { HttpService } from '../../../../service/HttpService';


@IonicPage()
@Component({
  selector: 'page-frequency',
  templateUrl: 'frequency.html',
})
export class FrequencyPage {

  @ViewChild('chartPie') chartPie: ElementRef;

  repairList: Object[] = [];
  repair: Object[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpService
  ) {
    this.getData();
  }
  getData() {
    var params = {
      method: 'statistics.repairFrequencyStatistics',
    }
    this.http.get(params).subscribe(res => {
      if (!!res && res.responseCode == 167110) {
        this.repairList = res.responseObj.repairStatisticsList;
        //for (var i = 0; i < this.repairList.length; i++) {
        //  var repairList = this.repairList[i];
        //}
      }
    });
  }
  status: number = 0;
  tabs(n: number) {
    this.status = n;
  }
  changeData() {
    this.data = this.data2;
  }
  data: any = [
    { title: '钟楼星巴克钟楼星巴克钟楼星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '三里屯星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '后海星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '翠微百货星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '北辰星巴克', percentage: '20%', price: '24000', count: '20' }

  ];
  data1: any = [
    { title: '钟楼星巴克钟楼星巴克钟楼星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '三里屯星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '后海星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '翠微百货星巴克', percentage: '20%', price: '24000', count: '20' },
    { title: '北辰星巴克', percentage: '20%', price: '24000', count: '20' }

  ];
  data2: any = [
    { title: '星期一', percentage: '20%', price: '24000', count: '20' },
    { title: '星期二', percentage: '20%', price: '24000', count: '20' },
    { title: '星期三', percentage: '20%', price: '24000', count: '20' },
    { title: '星期四', percentage: '20%', price: '24000', count: '20' },
    { title: '星期五', percentage: '20%', price: '24000', count: '20' }

  ];
  ionViewDidEnter() {
    var  lables = [],datas = [];
    for (var i = 0; i<this.repairList.length;i++){
      lables.push(this.repairList[i]["storeName"]);
      datas.push(this.repairList[i]["repairNum"]);
    }
    Chart.Doughnut(this.chartPie.nativeElement.getContext("2d"), {
      data: {
        labels: lables,
        datasets: [
          {
            data: datas,
            backgroundColor: [
              "#1E8CE1",
              "#8CC42A",
              "#FDA109",
              "#F85B25",
              "#9A34B8"
            ],
            hoverBackgroundColor: [
              "#1E8CE1",
              "#8CC42A",
              "#FDA109",
              "#F85B25",
              "#9A34B8"
            ]
          }]
      }
    });
  }
}
