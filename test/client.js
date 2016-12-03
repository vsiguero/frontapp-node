import assert from 'assert';
import {Client} from '../lib';
import nock from 'nock';

describe('clients', () => {
  it('should resolve promises', done => {
    nock('https://api2.frontapp.com').get('/analytics').reply(200, {});
    const client = new Client('token').usePromises();
    assert.equal(true, client.promises);
    client.users.list().then(r => {
      assert.equal(200, r.status);
      done();
    });
  });
  it('should use promises when callbacks are absent', done => {
    nock('https://api2.frontapp.com').get('/analytics').reply(200, {});
    const client = new Client('token', 'bar');
    client.users.list().then(r => {
      assert.equal(200, r.status);
      done();
    });
  });
  it('should reject promises', done => {
    nock('https://api2.frontapp.com').get('/analytics').reply(200, {type: 'error.list'});
    const client = new Client('token').usePromises();
    assert.equal(true, client.promises);
    client.users.list().catch(err => {
      assert.equal(true, err.message.indexOf('error.list') !== -1);
      done();
    });
  });
  it('should reject promises with error objects', done => {
    nock('https://api2.frontapp.com').get('/users').reply(200, {type: 'error.list'});
    const client = new Client('token').usePromises();
    client.users.list().catch(err => {
      assert.equal(true, err instanceof Error);
      done();
    });
  });
  it('should callback with errors', done => {
    const callback = function (err, d) {
      assert.equal('error.list', err.body.type);
      assert.equal(null, d);
      done();
    };
    const client = new Client('token');
    client.callback(callback, { body: { type: 'error.list' }});
  });
  it('should not crash if the callback is missing', () => {
    const client = new Client('token');
    assert.doesNotThrow(() => {
      client.callback();
    });
  });
  it('should construct with one fields', () => {
    const client = new Client('token');
    assert.equal('token', client.token);
  });
  it('should throw if no credentials found', () => {
    assert.throws(() => {
      const client = new Client();
      console.log(client.token);
    }, /Could not construct a client with those parameters/);
  });
});
