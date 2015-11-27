/**
 * Created by sirrocco on 11/25/2015.
 */

var fs = require('fs'),
    stream = require('stream'),
    youtubeApi = require('../services/youtubeApi');

module.exports = {
  get: function(req, res) {
    return res.render('video');
  },

  upload: function(req, res) {
    console.log('read the bloody thing');

    youtubeApi.videos.insert({
      resource: {
        snippet: {
          title: 'Test upload of a video via nodeJS',
          description: 'Test video upload',
        },
        status: {
          privacyStatus: 'private',
        },
      },
      part: 'snippet,status',
      media: {
        body: req.file.buffer,
      },
    }, function(err, data) {
      if (err) {
        console.log('Error:', err)
        return res.end('errorr', 400);
      }

      console.log('data', data)
      res.end('well ... ');
    });

  },
};
