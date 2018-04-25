'use strict';
const utils = require('./utils');

module.exports = app => {
  /**
   * 客服接口
   */
  class ApiCustom {
    /**
     * POST
     * @param {object} data - post数据
     * @param {string} type - 请求类型 msg: 消息类请求
     * @return {*} 返回信息
     */
    async post(data, type = 'msg') {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      let url = '';
      switch (type) {
        case 'msg':
          url = app.config.wx.apiBaseUrl + app.config.wx.apiUrl.sendCustom + '?access_token=' + accessToken;
          break;
        case 'addCustomservice':
          url = app.config.wx.apiBaseUrl + app.config.wx.apiUrl.addCustomservice + '?access_token=' + accessToken;
          break;
        case 'updateCustomservice':
          url = app.config.wx.apiBaseUrl + app.config.wx.apiUrl.addCustomservice + '?access_token=' + accessToken;
          break;
        default:
          break;
      }
      return await app.curl(
        url,
        {
          method: 'POST',
          contentType: 'json',
          data,
          dataType: 'json',
        }
      );
    }

    /**
     * 添加客服账号
     * @param {string} email - 邮箱
     * @param {string} nickname - 昵称
     * @param {string} password - 密码
     * @return {*} 正常返回true
     */
    async addCustomservice(email, nickname, password) {
      const data = {
        kf_account: email,
        nickname,
        password,
      };
      const res = await this.post(data, 'addCustomservice');
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 修改客服账号
     * @param {string} email - 邮箱
     * @param {string} nickname - 昵称
     * @param {string} password - 密码
     * @return {*} 正常返回true
     */
    async updateCustomservice(email, nickname) {
      const data = {
        kf_account: email,
        nickname,
      };
      const res = await this.post(data, 'updateCustomservice');
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 删除客服账号
     * @param {string} email - 邮箱
     * @return {*} 正常返回true
     */
    async deleteCustomservice(email) {
      const data = {
        kf_account: email,
      };
      const res = await this.post(data, 'deleteCustomservice');
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 获取客服列表
     * @return {*} 正常返回true
     */
    async getCustomserviceList() {
      const accessToken = await app.wx.apiCommon.getAccessToken();
      const res = await app.curl(
        app.config.wx.apiBaseUrl + app.config.wx.apiUrl.getCustomserviceList,
        {
          data: {
            access_token: accessToken,
          },
        }
      );
      utils.checkResponseStatus(res);
      return res.data;
    }

    /**
     * 发送文字消息
     * @param {string} openid - 用户Openid
     * @param {string} content - 内容
     * @return {*} 正常返回true
     */
    async sendText(openid, content) {
      const data = {
        touser: openid,
        msgtype: 'text',
        text: {
          content,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送图片消息
     * @param {string} openid - 用户Openid
     * @param {string} mediaID - 媒体ID
     * @return {*} 正常返回true
     */
    async sendImage(openid, mediaID) {
      const data = {
        touser: openid,
        msgtype: 'image',
        image: {
          media_id: mediaID,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送声音消息
     * @param {string} openid - 用户Openid
     * @param {string} mediaID - 媒体ID
     * @return {*} 正常返回true
     */
    async sendVoice(openid, mediaID) {
      const data = {
        touser: openid,
        msgtype: 'voice',
        voice: {
          media_id: mediaID,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送视频消息
     * @param {string} openid - 用户Openid
     * @param {string} mediaID - 视频媒体ID
     * @param {string} thumbMediaID - 视频媒体缩略图ID
     * @param {string} title - 标题
     * @param {string} description - 描述
     * @return {*} 正常返回true
     */
    async sendVideo(openid, mediaID, thumbMediaID, title, description) {
      const data = {
        touser: openid,
        msgtype: 'video',
        video: {
          media_id: mediaID,
          thumb_media_id: thumbMediaID,
          title,
          description,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送音乐消息
     * @param {string} openid - 用户Openid
     * @param {string} title - 标题
     * @param {string} description - 描述
     * @param {string} musicurl - 音乐地址
     * @param {string} hqmusicurl - HQ音乐地址
     * @param {string} thumbMediaID - 缩略图ID
     * @return {*} 正常返回true
     */
    async sendMusic(openid, title, description, musicurl, hqmusicurl, thumbMediaID) {
      const data = {
        touser: openid,
        msgtype: 'music',
        music: {
          title,
          description,
          musicurl,
          hqmusicurl,
          thumb_media_id: thumbMediaID,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送图文消息
     * @param {string} openid - 用户Openid
     * @param {array} articles - 图文消息列表格式为：
      [
       {
          "title": "Happy Day",
          "description": "Is Really A Happy Day",
          "url": "URL",
          "picurl": "PIC_URL"
        }
      ]
     * @return {*} 正常返回true
     */
    async sendNews(openid, articles) {
      const data = {
        touser: openid,
        msgtype: 'news',
        news: {
          articles,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送图文消息
     * @param {string} openid - 用户Openid
     * @param {string} mediaID - 图文消息ID
     * @return {*} 正常返回true
     */
    async sendMpNews(openid, mediaID) {
      const data = {
        touser: openid,
        msgtype: 'mpnews',
        mpnews: {
          media_id: mediaID,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }

    /**
     * 发送卡券
     * @param {string} openid - 用户Openid
     * @param {string} cardID - 卡券ID
     * @return {*} 正常返回true
     */
    async sendWxCard(openid, cardID) {
      const data = {
        touser: openid,
        msgtype: 'wxcard',
        wxcard: {
          card_id: cardID,
        },
      };
      const res = await this.post(data);
      utils.checkResponseStatus(res);
      return true;
    }
  }
  return new ApiCustom();
};
