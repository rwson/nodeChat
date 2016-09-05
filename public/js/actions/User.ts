/**
 * User
 * build by rwson @9/5/16
 * mail:rw_Song@sina.com
 * User Actions
 */

import {Injectable} from "@angular/core";
import {Actions, AppStore} from "angular2-redux";

type Types = "CHECK_LOGIN" | "LOGIN" | "LOGOUT" | "USER_OFFLINE" | "UPDATE_USER_INFO";
export const UserActionTypes = {
    CHECK_LOGIN: "CHECK_LOGIN" as Types,
    LOGIN: "LOGIN" as Types,
    LOGOUT: "LOGIN" as Types,
    USER_OFFLINE: "USER_OFFLINE" as Types,
    UPDATE_USER_INFO: "UPDATE_USER_INFO" as Types
};

export interface UserAction {
    type: String;
    online?: Boolean;
    user?: Object;
}

@Injectable()
export class User extends Actions {

    constructor(store: AppStore) {
        super(store);
    }

    /**
     * check user is or not login
     * @param online
     * @param userInfo
     * @returns {{type: (Types|any), userInfo: any, online: any}}
     */
    checkLogin(online: Boolean, userInfo: Object): UserAction {
        return {
            type: UserActionTypes.CHECK_LOGIN,
            userInfo: userInfo,
            online: online
        };
    }

    /**
     * update user info
     * @param userInfo
     * @returns {{type: (Types|any), userInfo: Object}}
     */
    updateUserInfo(userInfo: Object): UserAction {
        return {
            type: UserActionTypes.UPDATE_USER_INFO,
            userInfo: userInfo
        };
    }

    /**
     * user login
     * @param userInfo
     * @returns {{type: (Types|any), userInfo: any}}
     */
    userLogin(userInfo: Object): UserAction {
        return {
            type: UserActionTypes.LOGIN,
            userInfo: userInfo
        };
    }

    /**
     * user logout
     * @returns {{type: (Types|any)}}
     */
    userLogout(): UserAction {
        return {
            type: UserActionTypes.LOGOUT
        };
    }

    /**
     * user offline
     * @returns {{type: (Types|any)}}
     */
    userOffline() {
        return {
            type: UserActionTypes.USER_OFFLINE
        };
    }

}
