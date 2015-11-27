/**
 * Created by sirrocco on 11/25/2015.
 */

var multer = require('multer');

var youtubeAuthController = require('./controllers/youtubeAuthenticationController'),
    homeController = require('./controllers/homeController'),
    videoController = require('./controllers/videoController');

var uploader = multer({
  storage: multer.memoryStorage(),
  inMemory: true
});

module.exports = function(router) {
  router.get('/', homeController.get);
  router.get('/activity-list', homeController.activityList);
  router.get('/video', videoController.get);
  router.post('/video/upload', uploader.single('youtube_file'), videoController.upload);
  router.get('/youtube/authenticate', youtubeAuthController.initAuthentication);
  router.get('/youtube/oauth2callback', youtubeAuthController.oauth2Callback);
};
