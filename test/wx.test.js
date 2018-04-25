'use strict';

const mock = require('egg-mock');

describe('test/wx.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/wx-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, wx')
      .expect(200);
  });
});
