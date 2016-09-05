/**
 * Rooms
 * build by rwson @9/5/16
 * mail:rw_Song@sina.com
 * chat Rooms Actions
 */

import {Injectable} from "@angular/core";
import {Actions, AppStore} from "angular2-redux";

type Types = "GET_ROOMS"| "UPDATE_ROOM_NAME";
export const RoomsActionTypes = {
    GET_ROOMS: "GET_ROOMS" as Types,
    UPDATE_ROOM_NAME: "UPDATE_ROOM_NAME" as Types
};

export interface RoomsAction {
    type: String;
    id?: String;
    name: String;
    rooms?: Array<Object>;
}

@Injectable()
export class Rooms extends Actions {

    constructor(props: AppStore) {
        super(props);
    }

    /**
     * get all rooms
     * @param rooms
     * @returns {{type: (Types|any), rooms: Array<Object>}}
     */
    getRooms(rooms: Array<Object>) {
        return {
            type: RoomsActionTypes.GET_ROOMS,
            rooms: rooms
        };
    }

    /**
     * update a room's name
     * @param id
     * @param name
     * @returns {{type: (Types|any), id: String, name: String}}
     */
    updateRoomName(id: String, name: String) {
        return {
            type: RoomsActionTypes.UPDATE_ROOM_NAME,
            id: id,
            name: name
        };
    }

}



