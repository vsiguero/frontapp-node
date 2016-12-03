import assert from 'assert';
import {Client} from '../lib';
import nock from 'nock';

describe('analytics', () => {
  it('should be listed', done => {
    nock('https://api2.frontapp.com').get('/analytics').reply(200, {});
    const client = new Client('json_web_token').usePromises();
    client.analytics.list().then(r => {
      assert.equal(200, r.status);
      done();
    });
  });
});
