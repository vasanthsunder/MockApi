'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

var cors_options = {
    //"origin": "http://localhost:8080",
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true,
    //"allowedHeaders": "X-Requested-With"
}
app.use(cors(cors_options));

var timeout = require('connect-timeout');
app.use(timeout('10s')); // Should be less than haproxy server timeout
var onTimedout = function (req, res, next) {
    if (req.timedout)
        global.log.info('Request has timed out.');
    else
        next();
    //else
}
app.use(onTimedout);

global.log = console;

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
  console.log('Express Server is running http://127.0.0.1:' + port);
});