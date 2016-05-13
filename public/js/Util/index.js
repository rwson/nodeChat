/**
 * 工具方法
 */

"use strict";

export default class Util {

    /**
     * 根据指定参数合并两个对象
     * @param obj       第一个被合并的对象
     * @param obj2      第二个被合并的对象
     * @param override  如果第二个对象和第一个对象相同属性对应的值相同,指定为true,第一个的将被复写,否则被忽略
     * @returns {*}
     */
    static merge(obj, obj2, override){
        let res = obj;
        for (var i in obj2) {
            if (override && !!res[i]) {
                res[i] = obj2[i];
            } else {
                res[i] = obj2[i];
            }
        }
        return res;
    }

    /**
     * 获取一个随机字符串
     * @returns {string}
     */
    static random() {
        return ("" + (+new Date()) + Math.random() * 9999).toString(36).replace(/\./g, "");
    }

    /**
     * 生成指定范围内的随机数
     * @param min   最小值
     * @param max   最大值
     * @returns {number}
     */
    static randomRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 获取对象原型下的类名
     * @param obj   被获取的对象
     * @returns {*}
     */
    static getProType(obj) {
        return Object.prototype.toString.call(obj).toLowerCase().replace(/\[|\]/g, "").split(" ")[1];
    }

}


