export default class Analytics {
  constructor(client) {
    this.client = client;
  }
  get(params, f) {
    return this.client.get('/analytics', params, f);
  }
}
