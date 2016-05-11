/**
 * 菜单
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link } from "react-router";
import classname from "classname";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

class Nav extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 登出
     */
    logout() {

    }

    /**
     * 渲染导航布局
     * @returns {XML}
     */
    render() {
        const { curRoute } = this.props;
        return (
            <header className="navbar navbar-static-top bs-docs-nav navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">nodeChat</Link>
                    </div>
                    <nav id="bs-navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={classname({
                                "active":(curRoute == "/" || curRoute == "")
                            })}>
                                <Link to="/">首页</Link>
                            </li>
                            <li className={classname({
                                "active":curRoute == "login"
                            })}>
                                <Link to="/login">登录</Link>
                            </li>
                            <li className={classname({
                                "active":(curRoute == "rooms" || curRoute == "room")
                            })}>
                                <Link to="/rooms">房间列表</Link>
                            </li>
                            <li className={classname({
                                "active":curRoute == "my"
                            })}>
                                <Link to="/my">我的</Link>
                            </li>
                            <li>
                                <a href="javascript:;" onClick={this.logout()}>登出</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        curRoute: state.reducers.curRoute
    };
}

export default connect(mapStateToProps)(Nav);

