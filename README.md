# egg-wx

[![NPM version][npm-image]][npm-url]

[![build status][travis-image]][travis-url]

[![Test coverage][codecov-image]][codecov-url]

[![David deps][david-image]][david-url]

[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-wx.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-wx
[travis-image]: https://img.shields.io/travis/eggjs/egg-wx.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-wx
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-wx.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-wx?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-wx.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-wx
[snyk-url]: https://snyk.io/test/npm/egg-wx
[download-image]: https://img.shields.io/npm/dm/egg-wx.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-wx



# Install

```
$ npm i egg-wx --save
$ npm install xml2js egg-redis --save
```



# Usage

```
// {app_root}/config/plugin.js
exports.wx = {
  enable: true,
  package: 'egg-wx',
};
```



# Configuration

```javascript
// {app_root}/config/config.default.js
config.bodyParser = {
  extendTypes: {
    text: [ 'application/xml', 'text/xml', 'text/html' ],
  },
  enableTypes: [ 'text' ],
};

config.wx = {
  redisClient: '', // Set this if used Multi Clients
  redisPrefix: 'egg-wx',
  AppID: 'appid',
  AppSecret: 'app_secret',
  MiniAppID: 'mini_appid', // wechat mini program app id
  MiniAppSecret: 'mini_app_secret', // wechat mini program app secret
  token: 'egg-wx',
  EncodingAESKey: 'EncodingAESKey',
};
```

see https://mp.weixin.qq.com/wiki for more detail



# Example

```javascript
async index() {
    ctx.body = await app.wx.apiCommon.getAccessToken();
}
```


## Classes

<dl>
<dt><a href="#ApiCommon">ApiCommon</a></dt>
<dd><p>微信基本接口，包含获取AccessToken</p>
</dd>
<dt><a href="#ApiCustom">ApiCustom</a></dt>
<dd><p>客服接口</p>
</dd>
<dt><a href="#ApiJssdk">ApiJssdk</a></dt>
<dd><p>jssdk接口</p>
</dd>
<dt><a href="#ApiMenu">ApiMenu</a></dt>
<dd><p>自定义菜单接口</p>
</dd>
<dt><a href="#ApiMessage">ApiMessage</a></dt>
<dd><p>消息接口</p>
</dd>
<dt><a href="#ApiMiniProgramSession">ApiMiniProgramSession</a></dt>
<dd><p>小程序获取用户Session接口</p>
</dd>
<dt><a href="#ApiQRCode">ApiQRCode</a></dt>
<dd><p>qrcode接口</p>
</dd>
<dt><a href="#ApiServer">ApiServer</a></dt>
<dd><p>服务器验证接口</p>
</dd>
<dt><a href="#ApiShortUrl">ApiShortUrl</a></dt>
<dd><p>ShortUrl接口</p>
</dd>
<dt><a href="#ApiWebAuth">ApiWebAuth</a></dt>
<dd><p>用户授权接口</p>
</dd>
</dl>

<a name="ApiCommon"></a>

## ApiCommon
微信基本接口，包含获取AccessToken

**Kind**: global class  

* [ApiCommon](#ApiCommon)
    * [.getRedisCache()](#ApiCommon+getRedisCache) ⇒ <code>object</code>
    * [.getAccessToken()](#ApiCommon+getAccessToken) ⇒ <code>string</code>
    * [.getAccessTokenFromApi()](#ApiCommon+getAccessTokenFromApi) ⇒ <code>string</code>

<a name="ApiCommon+getRedisCache"></a>

### apiCommon.getRedisCache() ⇒ <code>object</code>
返回Redis对象

**Kind**: instance method of [<code>ApiCommon</code>](#ApiCommon)  
**Returns**: <code>object</code> - redis对象  
<a name="ApiCommon+getAccessToken"></a>

### apiCommon.getAccessToken() ⇒ <code>string</code>
获取AccessToken,如果cache存在则直接读取chace

**Kind**: instance method of [<code>ApiCommon</code>](#ApiCommon)  
**Returns**: <code>string</code> - AccessToken  
<a name="ApiCommon+getAccessTokenFromApi"></a>

### apiCommon.getAccessTokenFromApi() ⇒ <code>string</code>
通过微信接口获取AccessToken

**Kind**: instance method of [<code>ApiCommon</code>](#ApiCommon)  
**Returns**: <code>string</code> - AccessToken  
<a name="ApiCustom"></a>

## ApiCustom
客服接口

**Kind**: global class  

* [ApiCustom](#ApiCustom)
    * [.post(data, type)](#ApiCustom+post) ⇒ <code>\*</code>
    * [.addCustomservice(email, nickname, password)](#ApiCustom+addCustomservice) ⇒ <code>\*</code>
    * [.updateCustomservice(email, nickname, password)](#ApiCustom+updateCustomservice) ⇒ <code>\*</code>
    * [.deleteCustomservice(email)](#ApiCustom+deleteCustomservice) ⇒ <code>\*</code>
    * [.getCustomserviceList()](#ApiCustom+getCustomserviceList) ⇒ <code>\*</code>
    * [.sendText(openid, content)](#ApiCustom+sendText) ⇒ <code>\*</code>
    * [.sendImage(openid, mediaID)](#ApiCustom+sendImage) ⇒ <code>\*</code>
    * [.sendVoice(openid, mediaID)](#ApiCustom+sendVoice) ⇒ <code>\*</code>
    * [.sendVideo(openid, mediaID, thumbMediaID, title, description)](#ApiCustom+sendVideo) ⇒ <code>\*</code>
    * [.sendMusic(openid, title, description, musicurl, hqmusicurl, thumbMediaID)](#ApiCustom+sendMusic) ⇒ <code>\*</code>
    * [.sendNews(openid, articles)](#ApiCustom+sendNews) ⇒ <code>\*</code>
    * [.sendMpNews(openid, mediaID)](#ApiCustom+sendMpNews) ⇒ <code>\*</code>
    * [.sendWxCard(openid, cardID)](#ApiCustom+sendWxCard) ⇒ <code>\*</code>

<a name="ApiCustom+post"></a>

### apiCustom.post(data, type) ⇒ <code>\*</code>
POST

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 返回信息  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>object</code> |  | post数据 |
| type | <code>string</code> | <code>&quot;msg&quot;</code> | 请求类型 msg: 消息类请求 |

<a name="ApiCustom+addCustomservice"></a>

### apiCustom.addCustomservice(email, nickname, password) ⇒ <code>\*</code>
添加客服账号

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | 邮箱 |
| nickname | <code>string</code> | 昵称 |
| password | <code>string</code> | 密码 |

<a name="ApiCustom+updateCustomservice"></a>

### apiCustom.updateCustomservice(email, nickname, password) ⇒ <code>\*</code>
修改客服账号

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | 邮箱 |
| nickname | <code>string</code> | 昵称 |
| password | <code>string</code> | 密码 |

<a name="ApiCustom+deleteCustomservice"></a>

### apiCustom.deleteCustomservice(email) ⇒ <code>\*</code>
删除客服账号

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | 邮箱 |

<a name="ApiCustom+getCustomserviceList"></a>

### apiCustom.getCustomserviceList() ⇒ <code>\*</code>
获取客服列表

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  
<a name="ApiCustom+sendText"></a>

### apiCustom.sendText(openid, content) ⇒ <code>\*</code>
发送文字消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| content | <code>string</code> | 内容 |

<a name="ApiCustom+sendImage"></a>

### apiCustom.sendImage(openid, mediaID) ⇒ <code>\*</code>
发送图片消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| mediaID | <code>string</code> | 媒体ID |

<a name="ApiCustom+sendVoice"></a>

### apiCustom.sendVoice(openid, mediaID) ⇒ <code>\*</code>
发送声音消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| mediaID | <code>string</code> | 媒体ID |

<a name="ApiCustom+sendVideo"></a>

### apiCustom.sendVideo(openid, mediaID, thumbMediaID, title, description) ⇒ <code>\*</code>
发送视频消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| mediaID | <code>string</code> | 视频媒体ID |
| thumbMediaID | <code>string</code> | 视频媒体缩略图ID |
| title | <code>string</code> | 标题 |
| description | <code>string</code> | 描述 |

<a name="ApiCustom+sendMusic"></a>

### apiCustom.sendMusic(openid, title, description, musicurl, hqmusicurl, thumbMediaID) ⇒ <code>\*</code>
发送音乐消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| title | <code>string</code> | 标题 |
| description | <code>string</code> | 描述 |
| musicurl | <code>string</code> | 音乐地址 |
| hqmusicurl | <code>string</code> | HQ音乐地址 |
| thumbMediaID | <code>string</code> | 缩略图ID |

<a name="ApiCustom+sendNews"></a>

### apiCustom.sendNews(openid, articles) ⇒ <code>\*</code>
发送图文消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| articles | <code>array</code> | 图文消息列表格式为：       [        {           "title": "Happy Day",           "description": "Is Really A Happy Day",           "url": "URL",           "picurl": "PIC_URL"         }       ] |

<a name="ApiCustom+sendMpNews"></a>

### apiCustom.sendMpNews(openid, mediaID) ⇒ <code>\*</code>
发送图文消息

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| mediaID | <code>string</code> | 图文消息ID |

<a name="ApiCustom+sendWxCard"></a>

### apiCustom.sendWxCard(openid, cardID) ⇒ <code>\*</code>
发送卡券

**Kind**: instance method of [<code>ApiCustom</code>](#ApiCustom)  
**Returns**: <code>\*</code> - 正常返回true  

| Param | Type | Description |
| --- | --- | --- |
| openid | <code>string</code> | 用户Openid |
| cardID | <code>string</code> | 卡券ID |

<a name="ApiJssdk"></a>

## ApiJssdk
jssdk接口

**Kind**: global class  

* [ApiJssdk](#ApiJssdk)
    * [.getRedisCache()](#ApiJssdk+getRedisCache) ⇒ <code>object</code>
    * [.getJsapiTicket()](#ApiJssdk+getJsapiTicket) ⇒ <code>object</code>
    * [.getJsapiTicketFromApi(accessToken)](#ApiJssdk+getJsapiTicketFromApi) ⇒ <code>object</code>
    * [.getSign(url, nonce, timestamp)](#ApiJssdk+getSign) ⇒ <code>object</code>
    * [.getJsapiConfig(url)](#ApiJssdk+getJsapiConfig) ⇒ <code>object</code>

<a name="ApiJssdk+getRedisCache"></a>

### apiJssdk.getRedisCache() ⇒ <code>object</code>
返回Redis对象

**Kind**: instance method of [<code>ApiJssdk</code>](#ApiJssdk)  
**Returns**: <code>object</code> - redis对象  
<a name="ApiJssdk+getJsapiTicket"></a>

### apiJssdk.getJsapiTicket() ⇒ <code>object</code>
返回jsapi ticket对象,缓存读取

**Kind**: instance method of [<code>ApiJssdk</code>](#ApiJssdk)  
**Returns**: <code>object</code> - ticket对象  
<a name="ApiJssdk+getJsapiTicketFromApi"></a>

### apiJssdk.getJsapiTicketFromApi(accessToken) ⇒ <code>object</code>
返回jsapi ticket对象,接口返回

**Kind**: instance method of [<code>ApiJssdk</code>](#ApiJssdk)  
**Returns**: <code>object</code> - ticket对象  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | access-token |

<a name="ApiJssdk+getSign"></a>

### apiJssdk.getSign(url, nonce, timestamp) ⇒ <code>object</code>
返回签名

**Kind**: instance method of [<code>ApiJssdk</code>](#ApiJssdk)  
**Returns**: <code>object</code> - 返回签名  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | 授权网站 |
| nonce | <code>string</code> | 随机字符 |
| timestamp | <code>string</code> | 时间戳 |

<a name="ApiJssdk+getJsapiConfig"></a>

### apiJssdk.getJsapiConfig(url) ⇒ <code>object</code>
返回jssdk参数

**Kind**: instance method of [<code>ApiJssdk</code>](#ApiJssdk)  
**Returns**: <code>object</code> - 前端jssdk配置参数对象 {appId, timestamp, nonceStr, signature}  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | 授权网站 |

<a name="ApiMenu"></a>

## ApiMenu
自定义菜单接口

**Kind**: global class  

* [ApiMenu](#ApiMenu)
    * [.createMenu(menuItems)](#ApiMenu+createMenu) ⇒ <code>boolean</code>
    * [.getMenu()](#ApiMenu+getMenu) ⇒ <code>object</code>
    * [.deleteMenu()](#ApiMenu+deleteMenu) ⇒ <code>boolean</code>

<a name="ApiMenu+createMenu"></a>

### apiMenu.createMenu(menuItems) ⇒ <code>boolean</code>
创建自定义菜单

**Kind**: instance method of [<code>ApiMenu</code>](#ApiMenu)  
**Returns**: <code>boolean</code> - 创建结果  

| Param | Type | Description |
| --- | --- | --- |
| menuItems | <code>object</code> | 微信公众平台自定义菜单格式对象，详见微信接口文档 |

<a name="ApiMenu+getMenu"></a>

### apiMenu.getMenu() ⇒ <code>object</code>
获取当前自定义菜单结构

**Kind**: instance method of [<code>ApiMenu</code>](#ApiMenu)  
**Returns**: <code>object</code> - 菜单结构  
<a name="ApiMenu+deleteMenu"></a>

### apiMenu.deleteMenu() ⇒ <code>boolean</code>
删除当前自定义菜单

**Kind**: instance method of [<code>ApiMenu</code>](#ApiMenu)  
**Returns**: <code>boolean</code> - 结果  
<a name="ApiMessage"></a>

## ApiMessage
消息接口

**Kind**: global class  

* [ApiMessage](#ApiMessage)
    * [.getRandomStr(len)](#ApiMessage+getRandomStr) ⇒ <code>string</code>
    * [.getIntervalRandom(min, max)](#ApiMessage+getIntervalRandom) ⇒ <code>integer</code>
    * [.getObjectFromXml(data)](#ApiMessage+getObjectFromXml) ⇒ <code>object</code>
    * [.getXmlFromObject(data)](#ApiMessage+getXmlFromObject) ⇒ <code>object</code>
    * [.messageEncrypt(msg)](#ApiMessage+messageEncrypt) ⇒ <code>string</code>
    * [.messageDecrypt(msg)](#ApiMessage+messageDecrypt) ⇒ <code>string</code>
    * [.sendTemplateMessage(openid, template_id, data, jumpUrl, miniprogram)](#ApiMessage+sendTemplateMessage) ⇒ <code>string</code>
    * [.checkSign(urlQuery, encryptText)](#ApiMessage+checkSign) ⇒ <code>boolean</code>
    * [.getSign(timestamp, nonce, encryptText)](#ApiMessage+getSign) ⇒ <code>string</code>

<a name="ApiMessage+getRandomStr"></a>

### apiMessage.getRandomStr(len) ⇒ <code>string</code>
返回指定长度的随机字符串

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>string</code> - 随机字符串  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| len | <code>integer</code> | <code>16</code> | 随机字符长度 |

<a name="ApiMessage+getIntervalRandom"></a>

### apiMessage.getIntervalRandom(min, max) ⇒ <code>integer</code>
返回指定整数区间的随机数

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>integer</code> - 随机整数  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>integer</code> | 最小整数 |
| max | <code>integer</code> | 最大整数 |

<a name="ApiMessage+getObjectFromXml"></a>

### apiMessage.getObjectFromXml(data) ⇒ <code>object</code>
解析xml为对象

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>object</code> - 解析结果  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | 来自微信服务器的xml内容 |

<a name="ApiMessage+getXmlFromObject"></a>

### apiMessage.getXmlFromObject(data) ⇒ <code>object</code>
解析Object为xml

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>object</code> - 解析结果  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Object内容 |

<a name="ApiMessage+messageEncrypt"></a>

### apiMessage.messageEncrypt(msg) ⇒ <code>string</code>
返回微信消息加密文本

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>string</code> - 密文  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 信息文本 |

<a name="ApiMessage+messageDecrypt"></a>

### apiMessage.messageDecrypt(msg) ⇒ <code>string</code>
返回微信消息解密数据

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>string</code> - 解密文本  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | 密文文本 |

<a name="ApiMessage+sendTemplateMessage"></a>

### apiMessage.sendTemplateMessage(openid, template_id, data, jumpUrl, miniprogram) ⇒ <code>string</code>
发送模板消息

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>string</code> - 发送结果  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| openid | <code>string</code> |  | 接收openid |
| template_id | <code>string</code> |  | 模板ID |
| data | <code>string</code> |  | 模板数据 |
| jumpUrl | <code>string</code> |  | 跳转链接 |
| miniprogram | <code>string</code> | <code>null</code> | 小程序跳转 |

<a name="ApiMessage+checkSign"></a>

### apiMessage.checkSign(urlQuery, encryptText) ⇒ <code>boolean</code>
校验请求签名

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>boolean</code> - 校验结果  

| Param | Type | Description |
| --- | --- | --- |
| urlQuery | <code>object</code> | ctx.query |
| encryptText | <code>string</code> | 加密密文 |

<a name="ApiMessage+getSign"></a>

### apiMessage.getSign(timestamp, nonce, encryptText) ⇒ <code>string</code>
生成签名

**Kind**: instance method of [<code>ApiMessage</code>](#ApiMessage)  
**Returns**: <code>string</code> - 解密结果  

| Param | Type | Description |
| --- | --- | --- |
| timestamp | <code>string/integer</code> | unix(10)时间戳 |
| nonce | <code>string</code> | 随机字符串 |
| encryptText | <code>string</code> | 加密密文 |

<a name="ApiMiniProgramSession"></a>

## ApiMiniProgramSession
小程序获取用户Session接口

**Kind**: global class  
<a name="ApiMiniProgramSession+getSession"></a>

### apiMiniProgramSession.getSession(js_code) ⇒ <code>object</code>
小程序通过code获取用户Session

**Kind**: instance method of [<code>ApiMiniProgramSession</code>](#ApiMiniProgramSession)  
**Returns**: <code>object</code> - jscode2session数据  

| Param | Type | Description |
| --- | --- | --- |
| js_code | <code>\*</code> | 授权code |

<a name="ApiQRCode"></a>

## ApiQRCode
qrcode接口

**Kind**: global class  
<a name="ApiQRCode+createQRCode"></a>

### apiQRCode.createQRCode(type, sceneValue, expire_seconds) ⇒ <code>object</code>
生成二维码

**Kind**: instance method of [<code>ApiQRCode</code>](#ApiQRCode)  
**Returns**: <code>object</code> - 二维码值  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | 二维码类型 |
| sceneValue | <code>string/integer</code> |  | 场景值 |
| expire_seconds | <code>integer</code> | <code>30</code> | 超时时间 |

<a name="ApiServer"></a>

## ApiServer
服务器验证接口

**Kind**: global class  
<a name="ApiServer+checkServer"></a>

### apiServer.checkServer(ctx) ⇒ <code>boolean/string</code>
验证消息的确来自微信服务器，微信公众平台接口配置校验

**Kind**: instance method of [<code>ApiServer</code>](#ApiServer)  
**Returns**: <code>boolean/string</code> - 校验结果  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | 上下文对象 |

<a name="ApiShortUrl"></a>

## ApiShortUrl
ShortUrl接口

**Kind**: global class  
<a name="ApiShortUrl+createShortUrl"></a>

### apiShortUrl.createShortUrl(longurl) ⇒ <code>object</code>
生成二维码

**Kind**: instance method of [<code>ApiShortUrl</code>](#ApiShortUrl)  
**Returns**: <code>object</code> - 短连接  

| Param | Type | Description |
| --- | --- | --- |
| longurl | <code>string</code> | 长连接 |

<a name="ApiWebAuth"></a>

## ApiWebAuth
用户授权接口

**Kind**: global class  

* [ApiWebAuth](#ApiWebAuth)
    * [.getUserWebAccessToken(code)](#ApiWebAuth+getUserWebAccessToken) ⇒ <code>object</code>
    * [.refreshUserWebAccessToken(refresh_token)](#ApiWebAuth+refreshUserWebAccessToken) ⇒ <code>object</code>
    * [.getUserWebInfo(access_token, openid, lang)](#ApiWebAuth+getUserWebInfo) ⇒ <code>object</code>

<a name="ApiWebAuth+getUserWebAccessToken"></a>

### apiWebAuth.getUserWebAccessToken(code) ⇒ <code>object</code>
通过code获取用户网页授权access_token

**Kind**: instance method of [<code>ApiWebAuth</code>](#ApiWebAuth)  
**Returns**: <code>object</code> - access_token授权数据  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>\*</code> | 授权code |

<a name="ApiWebAuth+refreshUserWebAccessToken"></a>

### apiWebAuth.refreshUserWebAccessToken(refresh_token) ⇒ <code>object</code>
刷新用户网页授权access_token

**Kind**: instance method of [<code>ApiWebAuth</code>](#ApiWebAuth)  
**Returns**: <code>object</code> - access_token授权数据  

| Param | Type | Description |
| --- | --- | --- |
| refresh_token | <code>string</code> | 刷新token |

<a name="ApiWebAuth+getUserWebInfo"></a>

### apiWebAuth.getUserWebInfo(access_token, openid, lang) ⇒ <code>object</code>
获取用户信息

**Kind**: instance method of [<code>ApiWebAuth</code>](#ApiWebAuth)  
**Returns**: <code>object</code> - 用户信息对象  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| access_token | <code>string</code> |  | 用户网页授权access_token |
| openid | <code>string</code> |  | 用户openid |
| lang | <code>string</code> | <code>&quot;zh_CN&quot;</code> | 返回地区语音 |

