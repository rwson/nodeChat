/**
 * User
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {NgRedux} from "ng2-redux";

import {UserState} from "../reducers/User";

@Injectable()

export class UserActions {

    static UPDATE_USER = "GET_USER";
    static CHECK_LOGIN = "CHECK_LOGIN";
    static LOGIN = "LOGIN";
    static LOGOUT = "LOGOUT";


    constructor(private http: Http, private ngRedux: NgRedux<UserState>) {
    }

    checkLogin() {
        this.http.get("/api/validate")
            .map((res) => res.json())
            .subscribe((res) => {
                this.ngRedux.dispatch({
                    type: UserActions.CHECK_LOGIN,
                    online: res.status === "success"
                });
            }, (ex) => {
                this.ngRedux.dispatch({
                    type: UserActions.CHECK_LOGIN,
                    online: false
                });
            });
    }

    login(mail) {
        this.http.get(`/api/login-register/${mail}`)
            .map((res) => res.json())
            .subscribe((res) => {
                if(res.status === "success") {
                    this.ngRedux.dispatch({
                        type: UserActions.LOGIN,
                        info: res.info
                    });
                } else {
                    this.ngRedux.dispatch({
                        type: UserActions.LOGIN,
                        info: {},
                        online: false
                    });
                }
            }, (ex) => {
                this.ngRedux.dispatch({
                    type: UserActions.LOGIN,
                    info: {},
                    online: false
                });
            });
    }

    logout() {
        this.ngRedux.dispatch({
            type: UserActions.LOGOUT
        });
    }

    updateUser(info) {
        this.ngRedux.dispatch({
            type: UserActions.UPDATE_USER,
            info: info
        });
    }

}

