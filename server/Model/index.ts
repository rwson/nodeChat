/**
 * index
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import * as mongoose from "mongoose";
import {Config} from "../config";

import User from "./User";
import Message from "./Message";
import Room from "./Room";

mongoose.connect(Config.database);

export default {
    User: User,
    Message: Message,
    Room: Room
};
