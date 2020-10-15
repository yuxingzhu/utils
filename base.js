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