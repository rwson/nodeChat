/**
 * User
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
    var core_1, http_1, ng2_redux_1, UserActions;
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
            UserActions = (function () {
                function UserActions(http, ngRedux) {
                    this.http = http;
                    this.ngRedux = ngRedux;
                }
                UserActions.prototype.checkLogin = function () {
                    var _this = this;
                    this.http.get("/api/validate")
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        _this.ngRedux.dispatch({
                            type: UserActions.CHECK_LOGIN,
                            online: res.status === "success"
                        });
                    }, function (ex) {
                        _this.ngRedux.dispatch({
                            type: UserActions.CHECK_LOGIN,
                            online: false
                        });
                    });
                };
                UserActions.prototype.login = function (mail) {
                    var _this = this;
                    this.http.get("/api/login-register/" + mail)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        if (res.status === "success") {
                            _this.ngRedux.dispatch({
                                type: UserActions.LOGIN,
                                info: res.info
                            });
                        }
                        else {
                            _this.ngRedux.dispatch({
                                type: UserActions.LOGIN,
                                info: {},
                                online: false
                            });
                        }
                    }, function (ex) {
                        _this.ngRedux.dispatch({
                            type: UserActions.LOGIN,
                            info: {},
                            online: false
                        });
                    });
                };
                UserActions.prototype.logout = function () {
                    this.ngRedux.dispatch({
                        type: UserActions.LOGOUT
                    });
                };
                UserActions.prototype.updateUser = function (info) {
                    this.ngRedux.dispatch({
                        type: UserActions.UPDATE_USER,
                        info: info
                    });
                };
                return UserActions;
            }());
            UserActions.UPDATE_USER = "GET_USER";
            UserActions.CHECK_LOGIN = "CHECK_LOGIN";
            UserActions.LOGIN = "LOGIN";
            UserActions.LOGOUT = "LOGOUT";
            UserActions = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, ng2_redux_1.NgRedux])
            ], UserActions);
            exports_1("UserActions", UserActions);
        }
    };
});
//# sourceMappingURL=User.js.map