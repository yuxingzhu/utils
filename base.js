import { MessageBox, Message } from 'yuwp-ui';
import { isNil, isNaN } from 'lodash';

// 获取当前时间
export function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

// 添加千分位逗号
export function commafy(num) {
  const del = n => {
    n = String(n);
    if (n.trim() === '') {
      return '';
    }
    n = n.replace(/,/gi, '');
    return n;
  };
  num = String(num);
  if (num.trim() === '') {
    return '';
  }
  num = del(num);
  if (isNaN(num)) {
    return '';
  }
  const re = /(-?\d+)(\d{3})/;
  if (/^.*\..*$/.test(num)) {
    const pointIndex = num.lastIndexOf('.');
    let intPart = num.substring(0, pointIndex);
    const pointPart = num.substring(pointIndex + 1, num.length);
    intPart += '';

    while (re.test(intPart)) {
      intPart = intPart.replace(re, '$1,$2');
    }
    num = `${intPart}.${pointPart}`;
  } else {
    num += '';
    while (re.test(num)) {
      num = num.replace(re, '$1,$2');
    }
  }
  return num;
}

// 小数转百分数
export function toPercent(point) {
  let str = '';
  if (Number(point) === 0) {
    return '0.00%';
  }
  str = `${Number(point * 100).toFixed(2)}%`;
  return str;
}

// 百分比转小数
export function toPoint(percent) {
  if (isNil(percent) || isNaN(percent)) return 0;
  let str = percent.replace('%', '').replace(',', '');
  str /= 100;
  return str;
}

// 显示信息
export function showMessage(msg, type = 'error', duration = 5) {
  msg && Message({
    message: msg,
    type: type,
    duration: duration * 1000
  });
}

// 显示信息
export function showMessageAlert(msg, type= 'error') {
  msg && MessageBox({
    message: msg,
    type: type
  });
}

// 判断浏览器类型
export function getBrowserType() {
  // 取得浏览器的userAgent字符串
  var userAgent = navigator.userAgent; 
  // 判断是否Opera浏览器 OPR/43.0.2442.991
  if(userAgent.indexOf('OPR') > -1) {
    return 'Opera';
  } 
  // 判断是否Firefox浏览器 Firefox/51.0
  if(userAgent.indexOf('FireFox') > -1) {
    return 'FF';
  }
  // 判断是否IE浏览器 Trident/7.0;
  if(userAgent.indexOf('Trident') > -1) {
    return 'IE';
  }
  // 判断是否Edge浏览器 Edeg/14.14393
  if(userAgent.indexOf('Edge') > -1) {
    return 'Edge';
  }
  // 判断是否Chrome浏览器 Chrome/56.0.2924.87
  if(userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
   // 判断是否Safari浏览器 AppleWebKit/534.57.2
  if(userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  }
}
