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
export default {
  promisify,
  compareVersion,
  objKeySort,
  ObjectToString,
  formatTime
}