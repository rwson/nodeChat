/**
 * 首页
 */

"use strict";

import React,{ Component } from "react";
import { Route, Link } from "react-router";
import classname from "classname";
import * as Actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { online } = this.props;
        return (
            <div className="main-index">
                <div className="jumbotron masthead">
                    <div className="container">
                        <h1>nodeChat</h1>
                        <h2>React在线聊天室,你可以在房间里面发言、发送文件、添加好友、删除好友等等。</h2>
                        <p className="masthead-button-links">
                            <Link to={online ? "/rooms" : "/login"} className={`btn btn-lg btn-shadow ${classname({
                                "btn-success": online,
                                "btn-primary": !online
                            })}`}>
                                {online ? "房间列表" : "登录/注册"}
                            </Link>
                        </p>
                        <p>Powerd by rwson</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        "online": state.reducers.online
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps())(Main);
