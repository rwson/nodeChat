/**
 * 首页
 */

"use strict";

import React,{Component} from "react";
import {Route,Link} from "react-router";

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-index">
                <div className="jumbotron masthead">
                    <div className="container">
                        <h1>nodeChat</h1>
                        <h2>React在线聊天室,你可以在房间里面发言、发送文件、添加好友、删除好友等等。</h2>
                        <p className="masthead-button-links">
                            <Link to="/login" className="btn btn-lg btn-primary btn-shadow">登录/注册</Link>
                        </p>
                        <p>Powerd by rwson</p>
                    </div>
                </div>
            </div>
        );
    }

}