/**
 * User
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
System.register(["../actions/User"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function userReducer(state, action) {
        switch (action.type) {
            case User_1.UserActions.UPDATE_USER:
                return {
                    online: state.online,
                    info: action.info
                };
            case User_1.UserActions.CHECK_LOGIN:
                return {
                    online: action.online,
                    info: state.info
                };
            case User_1.UserActions.LOGIN:
                return {
                    online: action.online,
                    info: action.info
                };
            case User_1.UserActions.LOGOUT:
                return {
                    online: false,
                    info: {}
                };
            default:
                return state;
        }
    }
    var User_1, INIT_STATE;
    exports_1("userReducer", userReducer);
    return {
        setters: [
            function (User_1_1) {
                User_1 = User_1_1;
            }
        ],
        execute: function () {
            exports_1("INIT_STATE", INIT_STATE = {
                online: false,
                info: {}
            });
        }
    };
});
//# sourceMappingURL=User.js.map