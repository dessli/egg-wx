'use strict';

/**
 * egg-wx default config
 * @member Config#wx
 * @property {String} SOME_KEY - some description
 */
exports.wx = {
  redisClient: '',
  redisPrefix: 'egg-wx',
  AppID: 'appid',
  AppSecret: 'app_secret',
  token: 'egg-wx',
  EncodingAESKey: 'EncodingAESKey',
  apiBaseUrl: 'https://api.weixin.qq.com',
  apiUrl: {
    getAccessToken: '/cgi-bin/token', // grant_type=client_credential appid=APPID secret=APPSECRET
    menuCreate: '/cgi-bin/menu/create', // access_token=ACCESS_TOKEN
    menuGet: '/cgi-bin/menu/get', // access_token=ACCESS_TOKEN
    menuDelete: '/cgi-bin/menu/delete', // access_token=ACCESS_TOKEN
    userWebAuthAccessToken: '/sns/oauth2/access_token', // appid=APPID secret=SECRET code=CODE grant_type=authorization_code
    userRefreshWebAuthAccessToken: '/sns/oauth2/refresh_token', // appid=APPID grant_type=refresh_token refresh_token=REFRESH_TOKEN
    userWebInfo: '/sns/userinfo', // access_token=ACCESS_TOKEN openid=OPENID lang=zh_CN
    getJsapiTicket: '/cgi-bin/ticket/getticket', // access_token=ACCESS_TOKEN type=jsapi
    sendCustom: '/cgi-bin/message/custom/send', // access_token=ACCESS_TOKEN
    addCustomservice: '/customservice/kfaccount/add', // access_token=ACCESS_TOKEN
    updateCustomservice: '/customservice/kfaccount/update', // access_token=ACCESS_TOKEN
    deleteCustomservice: '/customservice/kfaccount/del', // access_token=ACCESS_TOKEN
    getCustomserviceList: '/cgi-bin/customservice/getkflist', // access_token=ACCESS_TOKEN
    messageTemplateSend: '/cgi-bin/message/template/send', // access_token=ACCESS_TOKEN
  },
};
