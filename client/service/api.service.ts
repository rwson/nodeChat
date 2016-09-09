import {Injectable} from "@angular/core";
import * as socket from "socket.io-client";

import "rxjs/add/operator/map";

const socketCfg = {
    main: "/",
    room: "/room",
    rooms: "/rooms",
    my: "/my"

};

const socketIns = {
    mainSocket: null,
    roomSocket: null,
    roomsSocket: null,
    userSocket: null
};

@Injectable()
export class WebSocketService {

    constructor() {
    }

    static connectMain() {
        socketIns.mainSocket = socket.connect(socketCfg.main);
    }

    static connectRoom() {
        socketIns.roomSocket = socket.connect(socketCfg.room);
    }

    static connectRooms() {
        socketIns.roomsSocket = socket.connect(socketCfg.rooms);
    }

    static connectUser() {
        socketIns.userSocket = socket.connect(socketCfg.my);
    }

}
