/**
 * Rooms
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
System.register(["../actions/Rooms"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function roomReducer(state, action) {
        switch (action.type) {
            case Rooms_1.RoomsActions.FETCH_ROOM:
                return {
                    rooms: action.rooms
                };
            case Rooms_1.RoomsActions.CREATE_ROOM:
            default:
                return state;
        }
    }
    var Rooms_1, INIT_STATE;
    exports_1("roomReducer", roomReducer);
    return {
        setters: [
            function (Rooms_1_1) {
                Rooms_1 = Rooms_1_1;
            }
        ],
        execute: function () {
            exports_1("INIT_STATE", INIT_STATE = {
                rooms: []
            });
        }
    };
});
//# sourceMappingURL=Rooms.js.map