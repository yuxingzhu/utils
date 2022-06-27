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

// 数值百分比显示 
export function toPercent (money) {
  money = parseFloat(money + '') + '%';
  return money;
}

// 数字金额转汉字金额
export function moneyToUpper(money) {
  // 汉字的数字
  var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 基本单位
  var cnIntRadice = ['', '拾', '佰', '仟'];
  // 对应整数部分扩展单位
  var cnIntUnits = ['', '万', '亿', '兆'];
  // 对应小数部分单位
  var cnDecUnits = ['角', '分', '毫', '厘'];
  
  // 整数金额时后面跟的字符
  var cnInteger = '整';
  
  // 整型完以后的单位
  var cnIntLast = '元';
  
  // 最大处理的数字
  var maxNum = 999999999999999.9999;
  
  // 金额整数部分
  var integerNum;
  
  // 金融小数部分
  var decimalNum;
  
  // 输出的中文金额字符串
  var chineseStr = '';
  
  // 分离金额后用的数组，预定义
  var parts;
  if (money === '') {
    return '';
  } 
  money = parseFloat(money);
  if (money >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') === -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen -i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1);
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]; 
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger; 
  } else if(decimalNum === '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

// 汉字金额转数字金额
export function upperToMoney(upper) {
  /*
  * 参数说明：
  * upper：要转化的汉字
  */
  // 金额数值
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 对应单位的乘积
  const upperMap = [10, 100, 1000];
  // 基本单位
  const cnIntRadice = ['拾', '佰', '仟'];
  // 对应整数部分扩展单位
  // var cnIntUnits = ['万', '亿', '兆'];
  // 对应小数部分单位乘积
  const cnDecMap = [0.1, 0.01];
  // 对应小数部分单位
  const cnDecUnits = ['角', '分'];
  // 金融单位亿之前的数值数组
  let maxArray = [];
  // 金融单位亿和万之间的数值数组
  let middleArray = [];
  // 金融单位万和元之间的数值数组
  let minArray = [];
  
  const part = upper.split('元');
  // 金融整数部分
  const integerNum = part[0];
  // 金融小数部分
  const decimalNum = part[1].split('');
  if (integerNum.indexOf('亿') !== -1) {
    maxArray = integerNum.split('亿')[0].split('');
    if (integerNum.indexOf('万') !== -1) {
      middleArray = integerNum.split('亿')[1].split('万')[0].split('');
      minArray = integerNum.split('亿')[1].split('万')[1].split('');
    } else {
      minArray = integerNum.split('亿')[1].split('');
    }
  } else if(integerNum.indexOf('万') !== -1) {
    middleArray = integerNum.split('万')[0].split('');
    minArray = integerNum.split('万')[1].split('');
  } else {
    miniArray = integerNum.split('');
  } 
  const getNum = function(upArray, cnNums, cnRadice, numArray, map) {
     const length = upArray.length;
     let num = 0;
     let sum = 0;
     for(let i = 0; i < length; i++) {
       const index = cnNums.indexOf(upArray[i]);
       const _index = cnRadice.indexOf(upArray[i]);
       if(index !== -1) {
         num += numArray[index];
         if(i === (length - 1)) {
           sum += num;
         }
       }
       if(_index !== -1) {
         num *= map[_index];
         sum += num;
         num = 0;
       }
     } 
     return sum;
  }
  const maxSum = getNum(maxArray, cnNums, cnIntRadice, num, upperMap);
  const middleSun = getNum(middleArray, cnNums, cnIntRadice, num, upperMap);
  const minSun = getNum(minArray, cnNums, cnIntRadice, num, upperMap);
  const cesSum = getNum(decimalNum, cnNums, cnDecUnits, num, cnDecMap);
  // 输出的数字金额字符串
  return (maxSum * 100000000) + (middleSun * 10000) + minSun + cesSum;
}
