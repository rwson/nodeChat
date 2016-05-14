/**
 * 具体房间
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link } from "react-router";
import classname from "classname";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import io from "socket.io-client";
import * as Actions from "../actions";
import { SOCKET_ADDRESS } from "../constants";
import Util from "../Util";

const socket = io.connect(SOCKET_ADDRESS.room);

/**
 * 用户列表
 */
class _UsersList extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 根据用户id添加好友
     * @param id    用户id
     */
    handleAddFriend(id) {
        const { addFriendCallback } = this.props;
        if (id) {
            addFriendCallback(id);
        }
    }

    /**
     * 根据list渲染用户列表
     * @param list  用户数据
     * @returns {*}
     */
    renderList(list, friends) {
        const _this = this;
        if (list && list.length) {
            return list.map((item) => {
                if (friends.indexOf(item._id) > -1) {
                    return (
                        <li className="list-group-item clearfix room-item user-item" key={Util.random()}>
                            <img src={item.avatarUrl} className="user-list-head"/>
                            <span title={item.name} className="user-item-name">{item.name}</span>
                        </li>
                    );
                } else {
                    return (
                        <li className="list-group-item clearfix room-item user-item" key={Util.random()}>
                            <button type="button" onClick={_this.handleAddFriend.bind(_this,item._id)}
                                    className="btn btn-success pull-right add-btn">
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                            <img src={item.avatarUrl} className="user-list-head"/>
                            <span title={item.name} className="user-item-name">{item.name}</span>
                        </li>
                    );
                }
            });
        }
    }

    /**
     * 渲染用户列表组件布局
     * @returns {XML}
     */
    render() {
        const {listData,friends} = this.props;
        return (
            <ul className="list-group">
                {this.renderList(listData, friends)}
            </ul>
        );
    }
}

/**
 * 消息列表
 */
class _MessageList extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 根据list数据渲染消息列表
     * @param list  消息数据
     * @param uId   用户id
     * @returns {*}
     */
    renderList(list, uId) {
        if (list && list.length) {
            return list.map((item) => {
                if (item.messageType == "user") {
                    return (
                        <div key={Util.random()} className={classname({
                        "my-post": item.creator._id == uId
                    })}>
                            <div className="media message-item">
                                <div className="media-left">
                                    <img className="media-object poster-head-pic" src={item.creator.avatarUrl}/>
                                </div>
                                <div className="media-body">
                                <span className="media-heading poster-info">
                                    {`${item.creator.name} - ${Util.convertTime(new Date(item.createAt), "yyyy-mm-dd HH:MM:SS")}`}
                                </span>

                                    <p className="message-content">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={Util.random()} className="system-message">
                            <div className="media message-item">
                                <div className="media-body">
                                    <p className="message-content">
                                        系统消息:{item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        const { listData, uId } = this.props;
        return (
            <div>
                {this.renderList(listData, uId)}
            </div>
        );
    }

}

class Room extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 组件被实例化完成
     */
    componentDidMount() {
        const { userInfo, getMessages, getUsers, updateRoomName } = this.props;
        const { id } = this.props.params;

        //  用户存在
        if (userInfo) {
            /**
             * 通知server端有新成员进入
             */
            socket.emit("join room", {
                "roomId": id,
                "userInfo": userInfo
            });
        }

        /**
         * 获取房间里的在线用户
         */
        socket.emit("get online users", {
            "roomId": id
        });

        /**
         * 获取房间里的消息
         */
        socket.emit("get messages", {
            "roomId": id
        });

        /**
         * 加入房间成功
         */
        socket.on("join success", (data) => {
            updateRoomName(data.roomName);
            console.log("加入房间成功!");
        });

        /**
         * 获取用户列表
         */
        socket.on("users", (data) => {
            getUsers(data.users);
        });

        /**
         * 获取消息
         */
        socket.on("messages", (data) => {
            getMessages(data.messages);
        });

        //  绑定异常处理
        Util.socketException(socket);
    }

    /**
     * 组件被销毁,用户离开房间,并且告诉其他用户,断开socket连接
     */
    componentWillUnmount() {
        const { userInfo } = this.props;
        const { id } = this.props.params;
        socket.emit("leave room", {
            "userId": userInfo._id,
            "roomId": id
        });
        socket.disconnect();
    }

    /**
     * 键盘按下
     * @param ev    事件对象
     */
    handleKeyDown(ev) {
        const { keyCode } = ev.nativeEvent;
        if (keyCode == 13) {
            this.handlePost(this);
        }
    }

    /**
     * 发送信息
     */
    handlePost() {
        const postInput = this.refs["post-input"];
        const postContent = postInput.value;
        const { userInfo } = this.props;
        const { id } = this.props.params;
        if (!postContent) {
            alert("请输入消息内容");
            return;
        }
        postInput.value = "";
        socket.emit("post message", {
            "content": postContent,
            "creator": userInfo,
            "roomId": id
        });
    }

    /**
     * 根据用户id添加好友
     * @param id
     */
    handleAddFriend(id) {

    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        const { users, messages, roomName, userInfo } = this.props;
        const friends = userInfo.friends.map((item) => {
            return item._id;
        });
        return (
            <div className="room-detail">
                <h1>{roomName}</h1>

                <div className="message-users clearfix">
                    <div className="room-messages">
                        <_MessageList listData={messages} uId={userInfo._id}/>
                    </div>
                    <div className="room-users">
                        <_UsersList listData={users} friends={friends} addFriendCallback={this.handleAddFriend}/>
                    </div>
                </div>
                <div className="post-edit-area">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="post-input" placeholder="请输入内容..."
                               onKeyDown={this.handleKeyDown.bind(this)}
                               aria-describedby="basic-addon2"/>
                        <span className="input-group-addon" onClick={this.handlePost.bind(this)}>发送</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        "messages": state.reducers.messages,
        "users": state.reducers.users,
        "userInfo": state.reducers.userInfo,
        "roomName": state.reducers.roomName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
