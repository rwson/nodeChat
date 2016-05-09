/**
 * 路由配置
 */

"use strict";

import React,{Component} from "react";
import {Route,Link,IndexRoute} from "react-router";
import {connect} from "react-redux";
import {createStore,bindActionCreators} from "redux";
import {routeActions} from "react-router-redux";

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
        return (
            <div className="body_container">
                {content}
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
        </Route>
    );
}