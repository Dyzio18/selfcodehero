const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'selfcodehero API documentation',
    version,
    license: {
      name: 'CC BY-NC-SA 4.0',
      url: 'https://github.com/dyzio18/selfcodehero/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
