'use strict';

var credentials = require('../../credentials'),
    request = require('request'),
    google = require('googleapis'),
    tokenManager = require('../services/tokenManager'),
    youtubeApi = require('../services/youtubeApi')

var OAuth2 = google.auth.OAuth2,
    oauth2Client = new OAuth2(credentials.clientId, credentials.clientSecret, credentials.oauthReturnUrl),
    scopes = [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.upload',
    ];

module.exports = {
  initAuthentication: function(req, res) {
    tokenManager.load(function(tokenData) {
      if (!tokenData) {
        var authUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline', // jscs:ignore
          scope: scopes,
        });

        return res.redirect(authUrl);
      } else {
        return res.redirect('/');
      }
    });
  },

  oauth2Callback: function(req, res) {
    console.log('incoming oauth2Callback');

    if (!req.query.code) {
      return res.redirect('/youtube/auth-error');
    }

    if (req.query.error) {
      console.log(req.query.error);
      return res.redirect('/youtube/auth-error');
    }

    oauth2Client.getToken(req.query.code, function(err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
        tokenManager.save(tokens);
        youtubeApi.setCredentials(tokens);

        return res.redirect('/?success=true');
        //oauth2Client.setCredentials(tokens);
      } else {
        console.error(err);
      }

      return res.redirect('/?success=false');
    });

    //var postData = {
    //  code: req.query.code,
    //  client_id: credentials.clientId,// jscs:ignore
    //  client_secret: credentials.clientSecret,// jscs:ignore
    //  redirect_uri: credentials.oauthReturnUrl,// jscs:ignore
    //  grant_type: 'authorization_code',// jscs:ignore
    //};
    //
    //request.post(
    //    'https://accounts.google.com/o/oauth2/token', {form: postData},
    //    function(error, response, body) {
    //      if (!error && response.statusCode == 200) {
    //        var tokenData = JSON.parse(body);
    //
    //      } else {
    //        console.log('Something went terribly wrong:', body);
    //      }
    //
    //    }
    //);
  },
};
