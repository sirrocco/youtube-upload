/**
 * Created by sirrocco on 11/25/2015.
 */

var google = require('googleapis'),
    youtubeApi = require('../services/youtubeApi'),
    tokenManager = require('../services/tokenManager');

module.exports = {
  get: function(req, res) {
    tokenManager.load(function(token) {
      return res.render('index', {tokenData: token});
    });
  },

  activityList: function(req, res) {
    youtubeApi.activities.list({part: 'snippet,contentDetails', home: true, maxResults: 20}, function(err, result) {
      var response = '';
      response += 'Error: ' + JSON.stringify(err, null, 4) + '\n';
      response += 'Data: ' + JSON.stringify(result, null, 4);
      res.end(response);
    });
  },
}
