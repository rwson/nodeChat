/**
 * 路由配置
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link,IndexRoute } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import * as netWorkApi from "../netWorkApi";


import {
    Main,
    Login,
    My,
    Nav,
    Room,
    Rooms
} from "../components";

/**
 * App Container
 */
class App extends Component {

    /**
     * 构造器
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        const { checkLogin } = this.props;
        //  检测用户是否登录
        netWorkApi.httpGetRequest({
            "url": netWorkApi.Urls.checkLogin,
            "context": this,
            "success": function (data) {
                checkLogin(true);
            },
            "error": function (ex) {
                checkLogin(false);
            }
        });
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        const {content, routes } = this.props;

        return (
            <div className="body-container">
                <Nav curState={routes[routes.length - 1]["path"] || ""} />

                <div className="container main-container">
                    {content}
                </div>
            </div>
        );
    }
}

/**
 * 路由配置
 * @returns {XML}
 */
export default function AppRouters() {
    return (
        <Route path="/" component={App}>
            <IndexRoute components={{content: Main}}/>
            <Route path="login" components={{content: Login}}/>
            <Route path="my" components={{content: My}}/>
            <Route path="room/:id" components={{content: Room}}/>
            <Route path="rooms" components={{content: Rooms}}/>
        </Route>
    );
}