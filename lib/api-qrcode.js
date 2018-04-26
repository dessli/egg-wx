'use strict';
const utils = require('./utils');

module.exports = app => {
  /**
   * qrcode接口
   */
  class ApiQRCode {
    constructor() {
      this.qrType = [ 'QR_SCENE', 'QR_STR_SCENE', 'QR_LIMIT_SCENE', 'QR_LIMIT_STR_SCENE' ];
    }

    /**
     * 生成二维码
     * @param {string} type 二维码类型
     * @param {string/integer} sceneValue 场景值
     * @param {integer} expire_seconds 超时时间
     * @return {object} 二维码值
     */
    async createQRCode(type, sceneValue, expire_seconds = 30) {
      if (!this.qrType.includes(type)) {
        return Promise.reject({ message: '二维码类型错误' });
      }
      const postData = {
        action_name: type,
        action_info: {
          scene: {},
        },
      };
      switch (type) {
        case 'QR_SCENE':
          postData.expire_seconds = expire_seconds;
          postData.action_info.scene = { scene_id: sceneValue };
          break;
        case 'QR_STR_SCENE':
          postData.expire_seconds = expire_seconds;
          postData.action_info.scene = { scene_str: sceneValue };
          break;
        case 'QR_LIMIT_SCENE':
          postData.action_info.scene = { scene_id: sceneValue };
          break;
        case 'QR_LIMIT_STR_SCENE':
          postData.action_info.scene = { scene_str: sceneValue };
          break;
        default:
          break;
      }
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const url = app.config.wx.apiBaseUrl + app.config.wx.apiUrl.createQRCode + '?access_token=' + accessToken;
      const res = await app.curl(
        url,
        {
          method: 'POST',
          contentType: 'json',
          dataType: 'json',
          data: postData,
        }
      );
      utils.checkResponseStatus(res);
      return res.data;
    }
  }
  return new ApiQRCode();
};
