/**
 * Room
 * build by rwson @9/5/16
 * mail:rw_Song@sina.com
 */

import {Injectable} from "@angular/core";
import {Actions, AppStore} from "angular2-redux";

type Types = "GET_MESSAGE" | "GET_USERS";
export const RoomActionTypes = {
    GET_MESSAGE: "GET_MESSAGE" as Types,
    GET_USERS: "GET_USERS" as Types
};

export interface RoomAction {
    type: String;
    messages?: Array<Object>;
    users: Array<Object>
}

export class Room extends Actions {

    constructor(props) {
        super(props);
    }

    /**
     * get users posted messages
     * @param messages
     * @returns {{type: (Types|any), messages: Array<Object>}}
     */
    getMessage(messages: Array<Object>) {
        return {
            type: RoomActionTypes.GET_MESSAGE,
            messages: messages
        };
    }

    /**
     * get all users in current room
     * @param users
     * @returns {{type: (Types|any), users: Array<Object>}}
     */
    getUsers(users: Array<Object>) {
        return {
            type: RoomActionTypes.GET_USERS,
            users: users
        };
    }
}
