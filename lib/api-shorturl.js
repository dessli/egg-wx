'use strict';
const utils = require('./utils');

module.exports = app => {
  /**
   * ShortUrl接口
   */
  class ApiShortUrl {
    /**
     * 生成二维码
     * @param {string} longurl 长连接
     * @return {object} 短连接
     */
    async createShortUrl(longurl) {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const url = app.config.wx.apiBaseUrl + app.config.wx.apiUrl.createShortUrl + '?access_token=' + accessToken;
      const res = await app.curl(
        url,
        {
          method: 'POST',
          contentType: 'json',
          dataType: 'json',
          data: {
            access_token: accessToken,
            action: 'long2short',
            long_url: longurl,
          },
        }
      );
      utils.checkResponseStatus(res);
      return res.data;
    }
  }
  return new ApiShortUrl();
};
