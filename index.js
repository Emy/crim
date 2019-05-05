const { Client } = require('klasa');
const { config, token } = require('./config');

class MyKlasaClient extends Client {
    constructor(...args) {
        super(...args);
    }
}
//Client.use(require('klasa-stats-plugin'));
Client.use(require('klasa-dashboard-hooks'));
new MyKlasaClient(config).login(token);