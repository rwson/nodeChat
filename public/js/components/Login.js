/**
 * 登录
 */

"use strict";

import React,{Component} from "react";
import {Route,Link} from "react-router";

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 登录处理函数
     */
    login() {
        const eleInput = this.refs["register-email"];
        const email = eleInput.value;
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
            alert("请输入正确格式的邮箱!");
            eleInput.value = "";
            return;
        }

    }

    /**
     * 渲染登录页面布局
     * @returns {XML}
     */
    render() {
        return (
            <div className="login-area">
                <div className="input-group">
                    <input type="text" className="form-control" ref="register-email" placeholder="请输入邮箱"
                           aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2" onClick={this.login.bind(this)}>登录/注册</span>
                </div>
            </div>
        );
    }

}