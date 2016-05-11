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
                <h1>Main</h1>
            </div>
        );
    }

}