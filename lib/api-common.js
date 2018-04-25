'use strict';
const utils = require('./utils');

module.exports = app => {
  /**
   * 微信基本接口，包含获取AccessToken
   */
  class ApiCommon {
    /**
     * 返回Redis对象
     * @return {object} redis对象
     */
    getRedisCache() {
      if (app.config.wx.redisClient === '') {
        return app.redis;
      }
      return app.redis.get(app.config.wx.redisClient);
    }
    /**
     * 获取AccessToken,如果cache存在则直接读取chace
     * @return {string} AccessToken
     */
    async getAccessToken() {
      const redis = this.getRedisCache();
      const cacheData = await redis.get(app.config.wx.redisPrefix + '-accessToken');
      if (cacheData === null) {
        return await this.getAccessTokenFromApi();
      }
      return JSON.parse(cacheData).access_token;
    }

    /**
     * 通过微信接口获取AccessToken
     * @return {string} AccessToken
     */
    async getAccessTokenFromApi() {
      const redis = this.getRedisCache();
      const res = await app.curl(
        app.config.wx.apiBaseUrl + app.config.wx.apiUrl.getAccessToken,
        {
          dataType: 'json',
          data: {
            grant_type: 'client_credential',
            appid: app.config.wx.AppID,
            secret: app.config.wx.AppSecret,
          },
        });
      utils.checkResponseStatus(res);
      if (typeof res.data.access_token === 'string') {
        await redis.set(app.config.wx.redisPrefix + '-accessToken', JSON.stringify(res.data), 'EX', res.data.expires_in);
        return res.data.access_token;
      }
      throw new Error('无法获取微信接口access_token: ' + JSON.stringify(res.data));
    }
  }
  return new ApiCommon();
};
