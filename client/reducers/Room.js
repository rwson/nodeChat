/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
System.register(["../actions/Room"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function roomReducer(state, action) {
        switch (action.type) {
            case Room_1.RoomActions.GET_USERS:
                return {
                    users: action.users,
                    messages: state.messages
                };
            case Room_1.RoomActions.GET_MESSAGES:
                return {
                    users: state.users,
                    messages: action.messages
                };
            default:
                return state;
        }
    }
    var Room_1, INIT_STATE;
    exports_1("roomReducer", roomReducer);
    return {
        setters: [
            function (Room_1_1) {
                Room_1 = Room_1_1;
            }
        ],
        execute: function () {
            exports_1("INIT_STATE", INIT_STATE = {
                users: [],
                messages: []
            });
        }
    };
});
//# sourceMappingURL=Room.js.map