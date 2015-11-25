/**
 * Created by sirrocco on 11/25/2015.
 */
var youtubeAuthController = require('./controllers/youtubeAuthenticationController'),
    homeController = require('./controllers/homeController');

module.exports = function(router) {
  router.get('/', homeController.get);
  router.get('/youtube/authentication', youtubeAuthController.initAuthentication);
  router.get('/youtube/oauth2callback', youtubeAuthController.oauth2Callback);
};
