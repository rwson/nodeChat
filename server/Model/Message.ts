/**
 * Message
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

"use strict";

import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const Message = new Schema({
    "content": String,          //  消息内容
    "creator": {                //  创建人
        "_id": ObjectId,
        "email": String,        //  邮箱
        "name": String,         //  用户名
        "avatarUrl": String     //  头像
    },
    "roomId": ObjectId,         //  所属房间id
    "createAt": {               //  发送时间
        "type": Date,
        "default": Date.now
    }
});

export default Message;
