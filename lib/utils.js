'use strict';

const checkResponseStatus = (res, checkErrcode = true) => {
  if (res.status !== 200) {
    throw new Error(`微信接口暂时无法使用(${res.status})`);
  }
  if (checkErrcode) {
    if (res.data.errcode !== undefined) {
      if (res.data.errcode !== 0) {
        throw new Error(res.data.errmsg);
      }
    }
  }
};

const getIntervalRandom = (min, max) => {
  const range = max - min;
  const rand = Math.random();
  return min + Math.round(rand * range);
};

const getRandomStr = (len = 16) => {
  let str = '';
  const str_pol = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  const max = str_pol.length - 1;
  for (let index = 0; index < len; index++) {
    str += str_pol.charAt(getIntervalRandom(0, max));
  }
  return str;
};

module.exports = {
  checkResponseStatus,
  getRandomStr,
  getIntervalRandom,
};
