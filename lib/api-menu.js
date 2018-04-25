'use strict';
const utils = require('./utils');

module.exports = app => {
  /**
   * 自定义菜单接口
   */
  class ApiMenu {
    /**
     * 创建自定义菜单
     * @param {object} menuItems - 微信公众平台自定义菜单格式对象，详见微信接口文档
     * @return {boolean} 创建结果
     */
    async createMenu(menuItems) {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const res = await app.curl(
        app.config.wx.apiBaseUrl + app.config.wx.apiUrl.menuCreate + '?access_token=' + accessToken,
        {
          method: 'POST',
          contentType: 'json',
          data: menuItems,
          dataType: 'json',
        }
      );
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 获取当前自定义菜单结构
     * @return {object} 菜单结构
     */
    async getMenu() {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const res = await app.curl(
        app.config.wx.apiBaseUrl + app.config.wx.apiUrl.menuGet + '?access_token=' + accessToken,
        {
          dataType: 'json',
        }
      );
      utils.checkResponseStatus(res, false);
      return res.data;
    }

    /**
     * 删除当前自定义菜单
     * @return {boolean} 结果
     */
    async deleteMenu() {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const res = await app.curl(
        app.config.wx.apiBaseUrl + app.config.wx.apiUrl.menuDelete + '?access_token=' + accessToken,
        {
          dataType: 'json',
        }
      );
      utils.checkResponseStatus(res);
      return true;
    }
  }
  return new ApiMenu();
};
