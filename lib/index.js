'use strict';

module.exports = app => {
  const apiCommon = require('./api-common')(app);
  const apiMenu = require('./api-menu')(app);
  const apiMessage = require('./api-message')(app);
  const apiServer = require('./api-server')(app);
  const apiJssdk = require('./api-jssdk')(app);
  const apiCustom = require('./api-custom')(app);
  const apiWebAuth = require('./api-web-auth')(app);
  const apiQRCode = require('./api-qrcode')(app);
  const apiShortUrl = require('./api-shorturl')(app);
  const apiMiniProgramSession = require('./api-mini-program-session')(app);
  const apiPay = require('./api-pay')(app);
  app.wx = {
    apiCommon,
    apiMenu,
    apiMessage,
    apiServer,
    apiJssdk,
    apiCustom,
    apiWebAuth,
    apiQRCode,
    apiShortUrl,
    apiMiniProgramSession,
    apiPay,
  };
};
