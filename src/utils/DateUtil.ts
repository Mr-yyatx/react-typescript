class DateUtil {
  /**
   * 例如:2017-06-28 10:48:46转成date类,
   * 可把- replace成/
   * DateUtil.formatDate(时间戳, "yyyy-MM-dd hh:mm:ss")
   * @param dateString
   * @return Date
   */
  static parserDateString(dateString: string) {
    if (dateString) {
      let regEx = new RegExp("\\-", "gi");
      let validDateStr = dateString.replace(regEx, "/");
      let milliseconds = Date.parse(validDateStr);
      return new Date(milliseconds);
    }
  }

  // timestamp时间戳 formater时间格式
  static formatDate(timestamp: string, formater: string) {
    let date = new Date();
    date.setTime(parseInt(timestamp));
    formater = (formater != null) ? formater : "yyyy-MM-dd hh:mm";
    // @ts-ignore
    Date.prototype.Format = function(fmt: string) {
      var o = {
        "M+": this.getMonth() + 1, //月
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
            // @ts-ignore
            (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    };
    // @ts-ignore
    return date.Format(formater);
  }

  // 毫秒转时长
  static formatTime(mss: number) {
    let hours = parseInt(String((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = parseInt(String((mss % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = Math.floor((mss % (1000 * 60)) / 1000);
    // 补零
    let zero = function(v: number) {
      return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(hours), zero(minutes), zero(seconds)].join(":");
  }

  static formatSecondTime(second: string) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
      i = parseInt(String(s / 60));
      s = parseInt(String(s % 60));
    }
    // 补零
    let zero = function(v: number) {
      return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
  }

  //毫秒转换为分钟和秒
  static mssToMinAndSec(mss: number) {
    let min = Math.floor((mss / 1000 / 60) << 0);
    let sec = Math.floor((mss / 1000) % 60);
    let zero = function(v: number) {
      return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(min), zero(sec)].join(":");
  }

  //秒转换为分钟和秒
  static secToMinAndSec(se: number) {
    let min = Math.floor((se / 60) << 0);
    let sec = Math.floor(se % 60);
    let zero = function(v: number) {
      return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(min), zero(sec)].join(":");
  }
}

export default DateUtil;
