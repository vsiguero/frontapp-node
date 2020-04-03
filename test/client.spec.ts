// import *  from 'jest';
import FrontApp, { FrontAppError } from '../src/client';
import * as nock from 'nock';

describe('clients', () => {
  it('should resolve promises', async () => {
    nock('https://api2.frontapp.com').get('/contacts').reply(200, {});
    const client = new FrontApp('token');
    await expect(client.contacts.list({})).resolves.toEqual({});
  });

  it('should reject promises resolved with error objects', () => {
    nock('https://api2.frontapp.com')
      .get('/contacts')
      .reply(200, {
        _error: {
          message: 'Front Error',
          title: 'Front Error',
          details: [],
          status: 200,
        },
      });
    const client = new FrontApp('token');
    return client.contacts.list({}).catch((err: any) => {
      expect(err).toBeInstanceOf(FrontAppError);
      expect(err.message).toContain('Front Error');
    });
  });

  it('should reject promises with error objects', async () => {
    nock('https://api2.frontapp.com')
      .get('/contacts')
      .reply(400, {
        _error: {
          message: 'Front Error',
          title: 'Front Error',
          details: [],
          status: 400,
        },
      });
    const client = new FrontApp('token');
    await expect(client.contacts.list({})).rejects.toThrow();
  });

  it('should callback with errors', (done) => {
    const callback = (err: any, data: object) => {
      expect(err).toBeInstanceOf(Error); // Shouldn't be FrontAppError ?
      expect(data).toEqual(null);
      done();
    };
    const client = new FrontApp('token').useCallbacks();
    return client.callback(callback, {
      body: {
        _error: {
          message: 'Front Error',
          title: 'Front Error',
          details: [],
          status: 400,
        },
      },
    });
  });

  it('should not crash if the callback is missing', () => {
    nock('https://api2.frontapp.com').get('/contacts').reply(200, {});
    const client = new FrontApp('token').useCallbacks();
    expect(() => {
      client.contacts.list({});
    }).not.toThrow();
  });

  it('should construct with one fields', () => {
    const client = new FrontApp('token');
    expect(client.token).toBe('token');
  });

  it('should throw if no credentials found', () => {
    expect(() => {
      new FrontApp();
    }).toThrowError('Could not construct a client with those parameters');
  });
});
