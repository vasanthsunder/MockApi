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
   // Error handler
  app.use(function (err, req, res, next) {
      global.log.error(err.message, err.stack);
      switch (err.code) {
          case 'SCHEMA_VALIDATION_FAILED':
              global.log.error('Swagger validation error(s)', JSON.stringify(err));
              //res.status(400).send({error: true, message: err.message});
              res.status(400).send({error:true, errors: err.results.errors, message: 'Bad Request'});
              break;
          case 'ETIMEDOUT':
              global.log.error('Response timeout error(s)', JSON.stringify(err));
              res.status(408).send({error: true, message: err.message});
              break;
          default:
              if (err.message.indexOf('defined in Swagger') !== -1)
                  res.status(400).send({error: true, message: err.message});
              else
                  res.status(500).send({error: true, message: err.message});
      }
  });
  var server;
  var port = process.env.interface_service_port || 10010;
  if (process.argv[2] === 'secure') {
      console.log("starting secure server");
      server = https.createServer(server_options, app).listen(port);
  } else {
      console.log("starting insecure server for local testing");
      server = app.listen(port);
  }
  if (server) {
      // listen for checkContinue events
      server.on('checkContinue', function (req, res) {
          req.checkContinue = true;
          app(req, res); // call express directly to route the request
      });
  }

  console.log("api_service started")
  /*var port = process.env.PORT || 10010;
  app.listen(port);
  console.log('Express Server is running http://127.0.0.1:' + port);*/
});