export function promisify(fn, self = null) {
  return function (opts = {}) {
    return new Promise((res, rej) => {
      opts.success = (...args) => res(...args);
      opts.fail = (...args) => rej(...args);
      fn.call(self, opts);
    });
  };
}


export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

// 对象有序化
export function objKeySort(obj) {
  let newkey = Object.keys(obj).sort();
  return newkey.reduce((c, e) => {
      c[e] = obj[e]
      return c
  }, {})
}

// 将对象属性与值拼接成串
export function ObjectToString(obj) {
  let str = '';
  if (obj) {
      for (let p in obj) {
          str += (p + '=' + obj[p] + '&');
      }
      if (str.substring(0, str.length - 1)) {
          return str.substring(0, str.length - 1);
      }
  }
  return str;
}


// 数据转化
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function formatTime(number, format) {
  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];

  let date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (let i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}


export function getRecentlyDay(day){
 
  　　var today = new Date();
   
   
  　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
   
   
  　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
   
   
   
  　　var tYear = today.getFullYear();
   
  　　var tMonth = today.getMonth();
   
  　　var tDate = today.getDate();
   
  　　tMonth = doHandleMonth(tMonth + 1);
   
  　　tDate = doHandleMonth(tDate);
   
  　　return tYear+"-"+tMonth+"-"+tDate;
   
  }
   
  function doHandleMonth(month){
   
  　　var m = month;
   
  　　if(month.toString().length == 1){
   
  　　　　m = "0" + month;
   
  　　}
   
  　　return m;
   
  }

export function getParams({ province, city, prefecture, areaName, placeName, placeId}) {
  let params = {
      province: province
  }
  if (city != '') {
      params['city'] = city;
    }
    if (prefecture != '') {
      params['prefecture'] = prefecture;
    }
    if (areaName != '') {
      params['areaName'] = areaName;
    }
    if (placeName != '') {
      params['placeId'] = placeId;
    }
  return params
}
export default {
  promisify,
  compareVersion,
  objKeySort,
  ObjectToString,
  formatTime,
  getParams,
  getNowFormatDate,
  getRecentlyDay
}