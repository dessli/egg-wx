'use strict';
const crypto = require('crypto');

module.exports = app => {
  /**
   * 服务器验证接口
   */
  class ApiServer {
    /**
     * 验证消息的确来自微信服务器，微信公众平台接口配置校验
     * @param {object} ctx - 上下文对象
     * @return {boolean/string} 校验结果
     */
    async checkServer(ctx) {
      const query = ctx.query;
      const tmpArray = [ app.config.wx.token, query.timestamp, query.nonce ];
      tmpArray.sort();
      let tmpString = '';
      for (const i of tmpArray) {
        tmpString += i;
      }
      const sha1 = crypto.createHash('sha1');
      sha1.update(tmpString);
      tmpString = sha1.digest('hex');
      if (tmpString === query.signature) {
        if (query.echostr) return query.echostr;
        return true;
      }
      return false;
    }
  }
  return new ApiServer();
};
