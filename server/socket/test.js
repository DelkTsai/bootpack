'use strict';

module.exports = function(app, io, socket) {

  const util    = require('../../lib/util-server'),
        logger  = util.logger;

  socket.on('test', () => {
    logger.info('test socket connected');
    socket.emit('test', {
      data: 'it works!'
    });
  });

};
