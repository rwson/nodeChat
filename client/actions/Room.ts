/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {NgRedux} from "ng2-redux";

import {RoomState} from "../reducers/Room";

@Injectable()

export class RoomActions {

    static GET_USERS = "GET_USERS";
    static GET_MESSAGES = "GET_MESSAGES";

    constructor(private http: Http, private ngRedux: NgRedux<RoomState>) {
    }

    getUsers(users) {
        return {
            type: RoomActions.GET_USERS,
            users: users || []
        }
    }

    getMessages(messages) {
        return {
            type: RoomActions.GET_MESSAGES,
            messages: messages || []
        };
    }
}

