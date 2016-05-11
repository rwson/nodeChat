/**
 * http请求相关封装
 */

"use strict";

import { getProType } from "../Util";

//  http请求默认参数配置
const httpDefaultConfig = {
    "mode": "cors",
    "credentials": "include",
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    }
};

/**
 * GET请求
 * @param opts  参数配置
 */
export function httpGetRequest(opts) {
    fetch(opts.url, {
        ...httpDefaultConfig,
        "method": "GET"
    }).then((res) => {
        return res.json();
    }).then((res) => {
        _runCallbacks(res, opts);
    }).catch((ex) => {
        throw  ex;
    });
}

/**
 * POST请求
 * @param opts  参数配置
 */
export function httpPostRequest(opts) {
    fetch(opts.url, {
        ...httpDefaultConfig,
        "method": "POST",
        "body":JSON.stringify(opts.body)
    }).then((res) => {
        return res.json();
    }).then((res) => {
        _runCallbacks(res, opts);
    }).catch((ex) => {
        throw  ex;
    });
}

/**
 * 运行回调函数
 * @param res   状态值(success|error)
 * @param opts  相关配置
 * @private
 */
function _runCallbacks(res, opts) {
    if (res.status == "success") {
        getProType(opts.success) == "function" && opts.success(res);
    } else if (res.status == "error") {
        getProType(opts.error) == "function" && opts.error(res);
    }
}
