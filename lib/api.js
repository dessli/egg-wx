'use strict';

class API {
}
API.mixin = obj => {
  for (const key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: ' + key);
    }
    API.prototype[key] = obj[key];
  }
};
module.exports = API;
