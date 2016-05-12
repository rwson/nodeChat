/**
 * 具体房间
 */

"use strict";

import React,{ Component } from "react";
import { Route,Link } from "react-router";
import classname from "classname";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../actions";
import { SOCKET_ADDRESS } from "../constants";

const socket = require("socket.io-client");

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "users": [],
            "messages": []
        };
    }

    /**
     * 获取所有房间
     */
    getRooms() {
    }

    render() {
        const {rooms} = this.props;

        return (
            <div className="room-detail">
                <h1>Room Detail</h1>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        "messages": state.reducer.messages
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
