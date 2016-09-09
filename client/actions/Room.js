/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
System.register(["@angular/core", "@angular/http", "ng2-redux"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, ng2_redux_1, RoomActions;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_redux_1_1) {
                ng2_redux_1 = ng2_redux_1_1;
            }
        ],
        execute: function () {
            RoomActions = (function () {
                function RoomActions(http, ngRedux) {
                    this.http = http;
                    this.ngRedux = ngRedux;
                }
                RoomActions.prototype.getUsers = function (users) {
                    return {
                        type: RoomActions.GET_USERS,
                        users: users || []
                    };
                };
                RoomActions.prototype.getMessages = function (messages) {
                    return {
                        type: RoomActions.GET_MESSAGES,
                        messages: messages || []
                    };
                };
                return RoomActions;
            }());
            RoomActions.GET_USERS = "GET_USERS";
            RoomActions.GET_MESSAGES = "GET_MESSAGES";
            RoomActions = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, ng2_redux_1.NgRedux])
            ], RoomActions);
            exports_1("RoomActions", RoomActions);
        }
    };
});
//# sourceMappingURL=Room.js.map