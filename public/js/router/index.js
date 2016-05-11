/**
 * 路由配置
 */

"use strict";

import React,{Component} from "react";
import {Route,Link,IndexRoute} from "react-router";
import {connect} from "react-redux";
import {createStore,bindActionCreators} from "redux";
import {routeActions} from "react-router-redux";

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
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        const {content} = this.props;

        console.log(content);

        return (
            <div className="body-container">
                <Nav />
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