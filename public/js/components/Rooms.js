/**
 * 房间列表
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

const socket = io.connect(SOCKET_ADDRESS.rooms);

/**
 * 房间列表
 */
class _RoomList extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 根据房间id删除自己创建的房间
     * @param id    房间id
     */
    handleDelete(id) {
        const { deleteCallback } = this.props;
        if (id) {
            deleteCallback(id);
        }
    }

    /**
     * 渲染每一项
     * @param list          房间list数据
     * @param uId           当前用户id
     * @returns {*}
     */
    renderList(list, uId) {
        const _this = this;
        if (list && list.length) {
            return list.map((item) => {
                if (item.creatorId == uId) {
                    return (
                        <li className="list-group-item clearfix room-item" key={Util.random()}>
                            <span className="badge user-nums">{item.users.length}</span>
                            <button type="button" onClick={_this.handleDelete.bind(_this,item._id)}
                                    className="btn btn-danger pull-right delete-btn">删除
                            </button>
                            <Link to={`/room/${item._id}`} className="btn btn-success pull-right delete-btn">进入</Link>
                            {item.name} - {Util.convertTime(new Date(item.createAt), "yyyy-mm-dd HH:MM:SS")}
                        </li>
                    );
                } else {
                    return (
                        <li className="list-group-item" key={Util.random()}>
                            <span className="badge user-nums">{item.users.length}</span>
                            <Link to={`/room/${item._id}`} className="btn btn-success pull-right delete-btn">进入</Link>
                            {item.name} - {Util.convertTime(new Date(item.createAt), "yyyy-mm-dd HH:MM:SS")}
                        </li>
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
        const { listData, uId} = this.props;
        return (
            <ul className="list-group">
                {this.renderList(listData, uId)}
            </ul>
        );
    }

}

class _PageBtns extends Component {

    constructor(props) {
        super(props);
    }
}

class Rooms extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 组件被实例化完成
     */
    componentDidMount() {
        const { getRooms } = this.props;

        //  后端返回所有房间
        socket.on("all room", (data) => {
            getRooms(data.rooms);
        });

        //  获取房间列表
        socket.emit("get all room");

        //  绑定异常处理
        Util.socketException(socket);
    }

    /**
     * keydown处理函数
     * @param ev
     */
    handleKeyDown(ev) {
        const { keyCode } = ev.nativeEvent;
        if (keyCode == 13) {
            this.handleCreate(this);
        }
    }

    /**
     * 根据房间id删除一个房间
     * @param id    房间id
     */
    handleDelete(id) {
        socket.emit("delete room", {
            "id": id
        });
    }

    /**
     * 创建房间
     */
    handleCreate() {
        const nameInput = this.refs["room-name"];
        const name = nameInput.value;
        const { userInfo } = this.props;
        nameInput.value = "";
        if (!name) {
            alert("请输入房间名称!");
        }
        socket.emit("create room", {
            "name": name,
            "creatorId": userInfo._id
        });
    }

    /**
     * 渲染组件布局
     * @returns {XML}
     */
    render() {
        const { rooms,userInfo } = this.props;
        return (
            <div className="room-lists">
                <div className="input-group">
                    <input type="text" className="form-control" ref="room-name" placeholder="请输入房间名"
                           onKeyDown={this.handleKeyDown.bind(this)}
                           aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2"
                          onClick={this.handleCreate.bind(this)}>创建</span>
                </div>
                <h1>房间列表</h1>
                <_RoomList listData={rooms} uId={userInfo._id} deleteCallback={this.handleDelete}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        "rooms": state.reducers.rooms,
        "userInfo": state.reducers.userInfo,
        "totalPages": state.reducers.totalPages,
        "currentPage": state.reducers.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
