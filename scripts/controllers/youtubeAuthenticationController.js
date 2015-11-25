'use strict';

var credentials = require('../../credentials'),
    request = require('request'),
    tokenManager = require('../services/tokenManager');

module.exports = {
  initAuthentication: function(req, res) {
    tokenManager.load(function(tokenData) {
      if (!tokenData) {
        console.log(err);
        var authUrl = credentials.oauthUri + '?';
        authUrl += 'client_id=' + encodeURIComponent(credentials.clientId);
        authUrl += '&response_type=code';
        authUrl += '&access_type=offline';
        authUrl += '&scope=' + encodeURIComponent('https://www.googleapis.com/auth/youtube.upload');
        authUrl += '&redirect_uri=' + encodeURIComponent(credentials.oauthReturnUrl);
        return res.redirect(authUrl);
      } else {
        return res.redirect('/');
      }
    });
  },

  oauth2Callback: function(req, res) {
    console.log('incoming oauth2Callback');

    if (!req.query.code) {
      return res.redirect('/error');
    }

    if (req.query.error) {
      return res.redirect('/error');
    }

    var postData = {
      code: req.query.code,
      client_id: credentials.clientId,// jscs:ignore
      client_secret: credentials.clientSecret,// jscs:ignore
      redirect_uri: credentials.oauthReturnUrl,// jscs:ignore
      grant_type: 'authorization_code',// jscs:ignore
    };

    request.post(
        'https://accounts.google.com/o/oauth2/token', {form: postData},
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var tokenData = JSON.parse(body);
            tokenManager.save(tokenData);
            return res.redirect('/?success=true');
          } else {
            console.log('Something went terribly wrong:', body);
          }
          return res.redirect('/?success=false');
        }
    );
  },
};
