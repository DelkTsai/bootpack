'use strict';

const shared = require('./shared.js');

module.exports = {

  // BASIC

  name: shared.name,

  namespace: shared.namespace,

  // ADVANCED

  dir: {
    app: 'client/app',
    assets: {
      img: 'public/img'
    },
    components: 'client/components',
    root: 'client',
    resolves: 'client/shared/resolves',
    routes: 'client/routes',
    services: 'client/shared/services',
    shared: 'client/shared',
    styles: 'client/shared/styles'
  },

  engine: shared.engines,

  framework: 'angular',

  prettify: shared.prettify,

  socket: shared.socket

};
