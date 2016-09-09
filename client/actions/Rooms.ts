/**
 * Rooms
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {NgRedux} from "ng2-redux";

import {RoomsState} from "../reducers/Rooms";

@Injectable()

export class RoomsActions {

    static CREATE_ROOM = "CREATE_ROOM";
    static FETCH_ROOM = "FETCH_ROOM";

    constructor(private http: Http, private ngRedux: NgRedux<RoomsState>) {
    }

    fetchRoom() {
        this.ngRedux.dispatch({
            type: RoomsActions.FETCH_ROOM,
            rooms: [{}]
        });
    }

    createRoom(name) {
        this.ngRedux.dispatch({
            type: RoomsActions.CREATE_ROOM,
            rooms: [{}]
        });
    }

}
