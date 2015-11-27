var google = require('googleapis'),
    tokenManager = require('./tokenManager'),
    credentials = require('../../credentials'),
    OAuth2 = google.auth.OAuth2,
    oauth2Client = new OAuth2(credentials.clientId, credentials.clientSecret, credentials.oauthReturnUrl),
    Youtube = google.youtube({version: 'v3', auth: oauth2Client});

var YoutubeAPI = module.exports = function(config) {
};

(function() {

  this.isAuthenticated = false;

  tokenManager.load(function(tokens) {
    setCredentials(tokens);
  }.bind(this));

  this.setCredentials = setCredentials;

  function setCredentials(tokens) {
    if (tokens) {
      oauth2Client.setCredentials(tokens);
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  // Add Google YouTube API functions
  var GoogleYoutube = Youtube;
  for (var f in GoogleYoutube) {
    this[f] = GoogleYoutube[f];
  }
}).call(YoutubeAPI);
