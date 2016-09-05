/**
 * index
 * build by rwson @9/5/16
 * mail:rw_Song@sina.com
 * util about network
 */

import Util from "../Util";

//  http请求默认参数配置
const httpDefaultConfig = {
    "mode": "cors",
    "credentials": "include",
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    }
};

//  请求前缀
const urlPrefix = "/api/";

const urls = {
    "checkLogin": `${urlPrefix}validate`,      //  验证是否登录
    "login": `${urlPrefix}login-register`,     //  登录、新用户注册
    "logout": `${urlPrefix}logout`             //  登出
};

export default class NetWorkApi {

    /**
     * 请求路径
     * @returns {{checkLogin: *, login: *, logout: *}}
     */
    static getRequestUrls() {
        return urls;
    }

    /**
     * GET请求
     * @param opts  参数配置
     */
    static httpGetRequest(opts) {
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
    static httpPostRequest(opts) {
        fetch(opts.url, {
            ...httpDefaultConfig,
            "method": "POST",
            "body": JSON.stringify(opts.body)
        }).then((res) => {
            return res.json();
        }).then((res) => {
            _runCallbacks(res, opts);
        }).catch((ex) => {
            throw  ex;
        });
    }
}

/**
 * 运行回调函数
 * @param res   状态值(success|error)
 * @param opts  相关配置
 * @private
 */
function _runCallbacks(res, opts) {
    if (res.status == "success") {
        Util.getProType(opts.success) == "function" && opts.success.call(opts.context || this, res);
    } else if (res.status == "error") {
        Util.getProType(opts.error) == "function" && opts.error.call(opts.context || this, res);
    }
}

