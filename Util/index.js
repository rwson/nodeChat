/**
 * 工具库
 */

module.exports = {

    /**
     * 生成范围内的一个随机数
     * @param  {number} min 最小值
     * @param  {number} max 最大值
     * @return {number}     最后求出的随机数
     */
    "random": function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * 输出一个指定格式的日期对象
     * @param  {Date} date 	日期示例
     * @return {object}
     */
    "getDate": function(date) {
        //	获取最后的日期对象
        var finalDate = date instanceof Date ? date : new Date(),

            year = finalDate.getFullYear(),
            month = this.toDouble(1 + finalDate.getMonth()),
            day = this.toDouble(finalDate.getDate()),
            hour = this.toDouble(finalDate.getHours()),
            minute = this.toDouble(finalDate.getMinutes()),
            second = this.toDouble(finalDate.getSeconds());

        return {
        	"year":year,
        	"month":month,
        	"date":date,
            "yyyy-MM-dd": year + "-" + month + "-" + day,
            "yyyy-MM-dd HH:mm:ss": year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        };
    },

    /**
     * 生成一个随机id
     */
    "getRandomId":function(){
    	return (Math.random() * 100 + (+(new Date()))).toString(16);
    },

    /**
     * [0-9] => ["00"..."09"]
     * @param  {number} num 	    要被转换的数字    
     * @return {string/number}      转换后的结果
     */
    "toDouble": function(num) {
        return num < 10 ? ("0" + num) : num;
    }

};
