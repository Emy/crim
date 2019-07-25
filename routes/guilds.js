const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
  constructor(...args) {
    super(...args, { route: 'guilds' });
  }

  get(request, response) {
    const guilds = this.client.guilds;
    if (!guilds) response.end('[]');
    return response.end(JSON.stringify(guilds));
  }
};
