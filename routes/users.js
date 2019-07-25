const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {
  constructor(...args) {
    super(...args, { route: 'users' });
  }

  get(request, response) {
    const users = this.client.users;
    if (!users) response.end('{}');
    return response.end(JSON.stringify(users));
  }
};
