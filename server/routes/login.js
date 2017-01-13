// NOTE: THIS ROUTE MUST BE LOADED LAST

'use strict';

module.exports = function(app) {

  // 404 PAGE
  app.get('/login', function (req, res) {
    res.render('login', {
      config: app.get('config')
    });
  });

};
