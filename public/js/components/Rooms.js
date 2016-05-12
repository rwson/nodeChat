/**
 * 房间列表
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link } from "react-router";
import classname from "classname";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import { SOCKET_ADDRESS } from "../constants";

const socket = require("socket.io-client")(SOCKET_ADDRESS.rooms);

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "rooms": []
        };
    }

    /**
     * 组件即将被实例化完成
     */
    componentWillMount() {
        const {} = this.props;
    }

    /**
     * 获取所有房间
     */
    getRooms() {
    }

    render() {
        const { rooms } = this.props;

        return (
            <div className="room-lists">
                <h1>房间列表</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge">14</span>
                        Cras justo odio
                    </li>
                    <li className="list-group-item">
                        <span className="badge">14</span>
                        Cras justo odio
                    </li>
                    <li className="list-group-item">
                        <span className="badge">14</span>
                        Cras justo odio
                    </li>
                    <li className="list-group-item">
                        <span className="badge">14</span>
                        Cras justo odio
                    </li>
                    <li className="list-group-item">
                        <span className="badge">14</span>
                        Cras justo odio
                    </li>
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        "rooms":state.reducers.rooms
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Rooms);
