/**
 * Created by sirrocco on 11/25/2015.
 */
var tokenManager = require('../services/tokenManager')

module.exports = {
  get: function(req, res) {
    tokenManager.load(function(token) {
      console.log(token);
      req.session.youtubeToken = token;
      return res.render('index', {tokenData: token});
    });
  },
}
