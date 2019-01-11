'use strict';
const utils = require('./utils');

module.exports = app => {
  /**
   * 小程序获取用户Session接口
   */
  class ApiMiniProgramSession {
    /**
     * 小程序通过code获取用户Session
     * @param {*} js_code - 授权code
     * @return {object} jscode2session数据
     */
    async getSession(js_code) {
      const res = await app.curl(
        app.config.wx.apiBaseUrl + app.config.wx.apiUrl.getMiniProgramSession,
        {
          data: {
            grant_type: 'authorization_code',
            appid: app.config.wx.MiniAppID,
            secret: app.config.wx.MiniAppSecret,
            js_code,
          },
          dataType: 'json',
        }
      );
      utils.checkResponseStatus(res);
      return res.data;
    }
  }
  return new ApiMiniProgramSession();
};
