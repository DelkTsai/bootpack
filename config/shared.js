'use strict';

module.exports = {

  // BASIC SETTINGS

  name: 'App',

  namespace: 'my-app',

  // OTHER SETTINGS

  domains: {
    production: 'my-app.com',
    staging: 'staging.my-app.com',
    test: 'test.my-app.com'
  },

  engines: {
    css: 'sass',
    html: 'pug'
  },

  prettify: true,

  port: 3000,

  socket: true

};
