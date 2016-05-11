/**
 * 登录
 */

"use strict";

import React,{ Component } from "react";
import {Route,Link} from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import * as netWorkApi from "../netWorkApi";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 登录处理函数
     */
    login() {
        const { login } = this.props;
        const eleInput = this.refs["register-email"];
        const email = eleInput.value;
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email) && email.length < 9) {
            alert("请输入正确格式的邮箱,且长度不小于9位!");
            eleInput.value = "";
            return;
        }

        //  邮箱符合规范
        netWorkApi.httpPostRequest({
            "url": `${netWorkApi.Urls.login}/${email}`,
            "context": this,
            "success": function (user) {
                login(user.user);
            },
            "error": function (ex) {
                alert(ex.message);
            }
        });
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

function matStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(matStateToProps, mapDispatchToProps)(Login);
