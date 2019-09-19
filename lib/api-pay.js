'use strict';
const crypto = require('crypto');
const xml2js = require('xml2js');
const utils = require('./utils');
const moment = require('moment');

module.exports = app => {
  /**
   * 支付接口
   */
  class ApiPay {
    /**
     * 生成统一支付接口xml
     * @param {*} attach attach
     * @param {*} body body
     * @param {*} notify_url notify_url
     * @param {*} openid openid
     * @param {*} out_trade_no out_trade_no
     * @param {*} total_fee total_fee
     * @param {*} spbill_create_ip spbill_create_ip
     * @param {*} mode mode-miniapp
     * @param {*} other other
     */
    async createUnifiedorderXml(attach, body, notify_url, openid, out_trade_no, total_fee, spbill_create_ip, mode = 'miniapp', other = {}) {
      let appid = app.config.wx.AppID;
      let trade_type = 'JSAPI';
      if (mode === 'miniapp') {
        appid = app.config.wx.MiniAppID;
        trade_type = 'JSAPI';
      }
      const baseData = { appid, attach, body, notify_url, openid, out_trade_no, total_fee, spbill_create_ip, trade_type, ...other };
      baseData.nonce_str = utils.getRandomStr(16);
      baseData.mch_id = app.config.wx.mch_id;
      const sortBaseDataKeys = Object.keys(baseData).sort();
      let signString = '';
      for (const it of sortBaseDataKeys) {
        signString += `${it}=${baseData[it]}&`;
      }
      signString += `key=${app.config.wx.payKey}`;
      const hasher = crypto.createHash('md5');
      hasher.update(signString, 'utf-8');
      const encryptString = hasher.digest('hex');
      const sign = encryptString.toUpperCase();
      baseData.sign = sign;
      const xmlBuilder = new xml2js.Builder({
        rootName: 'xml',
        headless: true,
        xmldec: { version: '1.0', encoding: 'utf-8' },
      });
      const postXml = xmlBuilder.buildObject(baseData);
      const res = await app.curl(
        app.config.wx.apiUrl.getPayUnifiedorder,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml',
          },
          data: postXml,
          timeout: 30000,
          dataType: 'text',
        }
      );
      const datas = await this.getObjectFromXml(res.data);
      if (datas.xml.return_code === 'FAIL') throw new Error(datas.xml.return_msg);
      return datas.xml;
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
  }
  return new ApiPay();
};
