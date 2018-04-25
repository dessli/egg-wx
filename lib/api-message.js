'use strict';
const crypto = require('crypto');
const pkcs7 = require('./pkcs7');
const xml2js = require('xml2js');
const utils = require('./utils');

module.exports = app => {
  /**
   * 消息接口
   */
  class ApiMessage {
    /**
     * 返回指定长度的随机字符串
     * @param {integer} len - 随机字符长度
     * @return {string} 随机字符串
     */
    getRandomStr(len = 16) {
      return utils.getRandomStr(len);
    }

    /**
     * 返回指定整数区间的随机数
     * @param {integer} min - 最小整数
     * @param {integer} max - 最大整数
     * @return {integer} 随机整数
     */
    getIntervalRandom(min, max) {
      const range = max - min;
      const rand = Math.random();
      return min + Math.round(rand * range);
    }

    /**
     * 解析xml为对象
     * @param {string} data - 来自微信服务器的xml内容
     * @return {object} 解析结果
     */
    async getObjectFromXml(data) {
      const xmlParser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
      return new Promise(function(resolve, reject) {
        xmlParser.parseString(data, (e, res) => {
          if (e !== null) {
            reject(e);
            return;
          }
          resolve(res);
        });
      });
    }

    /**
     * 解析Object为xml
     * @param {string} data - Object内容
     * @return {object} 解析结果
     */
    async getXmlFromObject(data) {
      const builder = new xml2js.Builder({ cdata: true, rootName: 'xml' });
      return builder.buildObject(data);
    }

    /**
     * 返回微信消息加密文本
     * @param {string} msg - 信息文本
     * @return {string} 密文
     */
    async messageEncrypt(msg) {
      if (app.config.wx.EncodingAESKey.length !== 43) {
        throw new Error('EncodingAESKey 设置错误');
      }
      const be = new Buffer(4);
      be.writeInt32BE(msg.length, 0);
      const randomMsg = this.getRandomStr() + be.toString() + msg + app.config.wx.AppID;
      const padMsg = pkcs7.encode(randomMsg);
      const key = new Buffer.from(app.config.wx.EncodingAESKey + '=', 'base64');
      const iv = key.slice(0, 16);
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let crypted = cipher.update(padMsg, 'utf8', 'binary');
      cipher.setAutoPadding(false);
      crypted += cipher.final('binary');
      crypted = new Buffer(crypted, 'binary').toString('base64');
      return crypted;
    }

    /**
     * 返回微信消息解密数据
     * @param {string} msg - 密文文本
     * @return {string} 解密文本
     */
    async messageDecrypt(msg) {
      // const crypted = new Buffer(msg, 'base64').toString('binary');
      const key = new Buffer.from(app.config.wx.EncodingAESKey + '=', 'base64');
      const iv = key.slice(0, 16);
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let deciphed = decipher.update(msg, 'base64', 'utf8');
      decipher.setAutoPadding(false);
      deciphed += decipher.final('utf8');
      const unpadMsg = pkcs7.decode(deciphed);
      const cutRandomMsg = unpadMsg.slice(16, unpadMsg.length);
      const be = new Buffer(unpadMsg.slice(0, 4));
      const xmlLength = be.readInt32BE(0);
      const xmlContent = cutRandomMsg.slice(4, xmlLength);
      return xmlContent;
    }

    /**
     * 发送模板消息
     * @param {string} openid - 接收openid
     * @param {string} template_id - 模板ID
     * @param {string} data - 模板数据
     * @param {string} jumpUrl - 跳转链接
     * @param {string} miniprogram - 小程序跳转
     * @return {string} 发送结果
     */
    async sendTemplateMessage(openid, template_id, data, jumpUrl = '', miniprogram = null) {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const url = app.config.wx.apiBaseUrl + app.config.wx.apiUrl.messageTemplateSend + '?access_token=' + accessToken;
      const postData = {
        touser: openid,
        template_id,
        data,
      };
      if (jumpUrl) {
        postData.url = jumpUrl;
      }
      if (miniprogram) {
        postData.miniprogram = miniprogram;
      }
      return await app.curl(
        url,
        {
          method: 'POST',
          contentType: 'json',
          data: postData,
          dataType: 'json',
        }
      );
    }

    /**
     * 校验请求签名
     * @param {object} urlQuery - ctx.query
     * @param {string} encryptText 加密密文
     * @return {boolean} 校验结果
     */
    checkSign(urlQuery, encryptText) {
      const tmpArray = [ app.config.wx.token, urlQuery.timestamp, urlQuery.nonce, encryptText ];
      tmpArray.sort();
      const sha1 = crypto.createHash('sha1');
      for (const i of tmpArray) {
        sha1.update(i);
      }
      const tmpString = sha1.digest('hex');
      if (tmpString === urlQuery.msg_signature) {
        return true;
      }
      return false;
    }

    /**
     * 生成签名
     * @param {string/integer} timestamp - unix(10)时间戳
     * @param {string} nonce - 随机字符串
     * @param {string} encryptText - 加密密文
     * @return {string} 解密结果
     */
    getSign(timestamp, nonce, encryptText) {
      const tmpArray = [ app.config.wx.token, timestamp, nonce, encryptText ];
      tmpArray.sort();
      const sha1 = crypto.createHash('sha1');
      for (const i of tmpArray) {
        sha1.update(i);
      }
      return sha1.digest('hex');
    }
  }
  return new ApiMessage();
};
