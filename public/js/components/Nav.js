/**
 * 菜单
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link } from "react-router";
import classname from "classname";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "../history";
import * as Actions from "../actions";
import NetWorkApi from "../NetWorkApi";

class Nav extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        const { checkLogin, curState } = this.props;

        //  检测用户是否登录
        NetWorkApi.httpGetRequest({
            "url": NetWorkApi.getRequestUrls().checkLogin,
            "context": this,
            "success": function (data) {
                checkLogin(true, data.user);

                //  登录页面做跳转
                if (curState == "login") {
                    history.replaceState(null, "/");
                }
            },
            "error": function (ex) {
                checkLogin(false, {});
            }
        });
    }

    /**
     * 登出
     */
    logout() {
        const { userLogout, userOffline } = this.props;

        //  检测用户是否登录
        NetWorkApi.httpPostRequest({
            "url": NetWorkApi.getRequestUrls().logout,
            "context": this,
            "success": function (data) {
                //  退出登录后,前端也下线
                userLogout();
                checkLogin(false, {});
                userOffline();
            },
            "error": function (ex) {
                alert("退出登录失败!请重试!");
            }
        });
    }

    /**
     * 渲染导航布局
     * @returns {XML}
     */
    render() {
        const { curState, online, userInfo } = this.props;

        return (
            <header className="navbar navbar-static-top bs-docs-nav navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">nodeChat</Link>
                    </div>
                    <nav id="bs-navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={classname({
                                "active": (curState == "/" || curState == "")
                            })}>
                                <Link to="/">首页</Link>
                            </li>
                            <li className={classname({
                                "active": curState == "login",
                                "hide-nav-item": online
                            })}>
                                <Link to="/login">登录</Link>
                            </li>
                            <li className={classname({
                                "active": curState == "rooms",
                                "hide-nav-item": !online
                            })}>
                                <Link to="/rooms">房间列表</Link>
                            </li>
                            <li className={classname({
                                "active": curState == "my",
                                "hide-nav-item": !online
                            })}>
                                <Link to="/my">我的</Link>
                            </li>
                            <li className={classname({
                                "hide-nav-item": !online
                            })}>
                                <a href="javascript:;" onClick={this.logout.bind(this)}>登出</a>
                            </li>
                        </ul>
                        <ul className={`nav navbar-nav navbar-right ${classname({
                                "hide-nav-item": !Object.keys(userInfo).length
                            })}`}>
                            <li>
                                <Link to={`/user/${userInfo._id}`} className="user-head-link">
                                    <img src={userInfo.avatarUrl} title={userInfo.name}
                                         className="img-rounded user-head"/>
                                </Link>
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
        "online": state.reducers.online,
        "userInfo": state.reducers.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
