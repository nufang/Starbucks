import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import { Observable } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";
import * as querystring from 'querystring';
import { API_ROOT } from "../providers/httpUrl";

@Injectable()
export class HttpService {
    constructor(private http: Http) {
    }

    headers = new Headers({ 'Content-Type': 'application/x-www' });
    options = new RequestOptions({ headers: this.headers });

    //get请求
    get(params: any): Observable<any> {
        if (params) var url = API_ROOT + "?" + querystring.stringify(params);
        return this.http.get(url, {
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            })
        }).map(res => res.json());
    }

    //post请求
    post(params: any): Observable<any> {
        console.log(params);
        return this.http.post(API_ROOT, querystring.stringify(params), {
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            })
        }).map(res => res.json());
    }
}
