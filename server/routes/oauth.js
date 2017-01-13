'use strict';

const passport = require('passport');

module.exports = function(app) {

  app.get('/auth/slack', passport.authenticate('slack', {
    scope: 'groups:read,team:read,users:read,channels:read,users.profile:read,bot,chat:write:bot,reminders:read,reminders:write,search:read,usergroups:read'
  }));

  app.get('/login', function (req, res) {
    res.status(200).send('login failed!');
  });

  app.get('/oauth/slack', function(req, res, next) {
    passport.authenticate('slack', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  });

};
