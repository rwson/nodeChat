/**
 * 我的好友
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link } from "react-router";
import classname from "classname";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";

class My extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 根据用户名查询用户
     * @param userName  用户名
     */
    queryUser(userName) {

    }

    /**
     * 添加一个好友
     * @param userId    用户id
     */
    addFriend(userId) {

    }

    /**
     * 删除一个好友
     * @param friendId    好友id
     */
    deleteFirend(friendId) {
    }

    render() {
        return (
            <div>
                My
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        userInfo: state.reducers.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(My);
