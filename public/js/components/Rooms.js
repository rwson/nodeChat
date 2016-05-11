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

class Rooms extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 获取所有房间
     */
    getRooms() {
    }

    render() {
        const {rooms} = this.props;

        return (
            <div className="room-lists">
                <h1>Room List</h1>
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
