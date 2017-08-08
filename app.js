'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();
var express = require('express');
var cors = require('cors');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.use('/api-docs', express.static(__dirname + '/swagger/swagger-ui'));

var cors_options = {
    // "origin": "http://localhost:8080",
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true
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

  // Add swagger-ui (This must be before swaggerExpress.register)
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);
   // Error handler
  app.use(function (err, req, res, next) {
      global.log.error(err.message, err.stack);
      switch (err.code) {
          case 'SCHEMA_VALIDATION_FAILED':
              global.log.error('Swagger validation error(s)', JSON.stringify(err));
              var errorJson = {"error": []};
              if (err.results.errors) {
                if(err.results.errors.length == 1) { //If the error is only one, then create json object, else json array
                    errorJson = {"error": err.results.errors[0].message};
                } else {
                    for (var i in  err.results.errors) {
                        errorJson.error.push(err.results.errors[i].message);                
                    }
                }
              }
              res.status(400).send(errorJson);
              break;
          case 'ETIMEDOUT':
              global.log.error('Response timeout error(s)', JSON.stringify(err));
              res.status(408).send({error: err.message});
              break;
          default:
              if (err.message.indexOf('defined in Swagger') !== -1)
                  res.status(400).send({error: err.message});
              else
                  res.status(500).send({error: err.message});
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