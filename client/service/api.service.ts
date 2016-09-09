import { Injectable } from "@angular/core";
import * as socket from "socket.io-client";

import "rxjs/add/operator/map";

const socketCfg = {
    main: "/",
    room: "/room",
    rooms: "/rooms",
    my: "/my"

};

@Injectable()
export class WebSocketService {

    mainSocket: any;
    roomSocket: any;
    roomsSocket: any;
    userSocket: any;

    constructor() {
        this.mainSocket;
    }

    static connectMain() {
        this.mainSocket
    }

}
