/**
 * Created by sirrocco on 11/25/2015.
 */
'use strict';

var express = require('express'),
    path = require('path'),
    helmet = require('helmet'),
    session = require('express-session'),
    google = require('googleapis'),
    logger = require('morgan');

var app = express();
app.use(express.static('public'));
app.use(helmet());
app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
      secret: 's3Cur3',
      name: 'youtube-uploader-session',
      resave: false,
      saveUninitialized: false,
    })
);

var routing = require('./scripts/routing');
routing(app);

var server = app.listen(5000, function() {
  var host = server.address().address,
      port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
