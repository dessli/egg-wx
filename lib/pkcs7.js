'use strict';
module.exports = {
  /**
   * pkcs7 encode
   * @param {string} text 字符串
   * @param {integer} blockSize 填充位数
   * @return {string} 填充后的字符串
   */
  encode(text, blockSize = 32) {
    let pad = blockSize - (text.length % blockSize);
    if (pad === 0) {
      pad = blockSize;
    }
    const padChar = String.fromCharCode(pad);
    let tmp = '';
    for (let index = 0; index < pad; index++) {
      tmp += padChar;
    }
    return text + tmp;
  },
  /**
   * pkcs7 decode
   * @param {string} text 字符串
   * @param {integer} blockSize 填充位数
   * @return {string} 去除填充后的字符串
   */
  decode(text, blockSize = 32) {
    let pad = text.slice(-1).charCodeAt(0);
    if (pad < 1 || pad > blockSize) {
      pad = 0;
    }
    return text.slice(0, (text.length - pad));
  },
};
