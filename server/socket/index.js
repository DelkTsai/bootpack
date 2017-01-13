'use strict';

const util      = require('../../lib/util-server'),
      logger    = util.logger;

module.exports = class {

  constructor(app) {
    this.app      = app;
    this.config   = app.get('config');
    this.session  = app.get('sessionStore');
  }

  // CONNECT SOCKET
  connect() {

    let io     = require('socket.io')(this.app.server);
    let connection = io.of('/' + this.config.namespace);

    // ON CONNECTION
    connection.on('connection', (socket) => {

      logger.info('client connected', socket.id);

      require('./test')(this.app, io, socket);

      // TELL CLIENT WE'RE CONNECTED
      socket.emit('connected', {
        connected: true,
        id: socket.id
      });

      // ERROR HANDLER
      socket.on('error', (err) => {
        logger.error('socket Error:', err);
        socket.emit('error', {
          err: err.message
        });
      });

      // HANDLE DISCONNECTIONS
      socket.on('disconnect', (socket) => {
        logger.info('client disconnected', socket.id);
      });

    });

  }

};
