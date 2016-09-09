System.register(["@angular/core", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, socketCfg, WebSocketService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            socketCfg = {
                main: "/",
                room: "/room",
                rooms: "/rooms",
                my: "/my"
            };
            WebSocketService = (function () {
                function WebSocketService() {
                    this.mainSocket;
                }
                WebSocketService.connectMain = function () {
                    this.mainSocket;
                };
                return WebSocketService;
            }());
            WebSocketService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], WebSocketService);
            exports_1("WebSocketService", WebSocketService);
        }
    };
});
//# sourceMappingURL=api.service.js.map