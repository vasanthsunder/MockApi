// var msgpack = require('msgpack5')(),
//     Map = require('collections/map'),
//     configManager = require('kea-config'),
//     metrics = require('metrics'),
//     Freezer = require('freezer-js'),
//     Map = require('collections/map'),
//     uuid = require('uuid'),
//     ddReporting = require('./../metrics/dd-report.js');

// var cluster = require('cluster');
// var http = require('http');

// var kafka = require('kafka-node');

// configManager.init('./config/main.conf.js');


// // DD graphite reporter
// /*var graphite_settings = configManager.get('graphite');
// reporter = new ddReporting.GraphiteReporter(ddReporting.report, "interface", graphite_settings.host, graphite_settings.port);
// reporter.on('log', function(level, msg, exc) {
//     if(exc) {
//         console.log('%s -- %s (%s)', level, msg, exc);
//     } else {
//         console.log('%s -- %s', level, msg);
//     }
// });
// reporter.start(graphite_settings.reporting_interval);
// */

// var map = new Map({});


// var kafka_settings = configManager.get('kafka');
// var clientId = kafka_settings.client.clientId;
// //var reqqnameprefix = kafka_settings.apiservice.request_queue_prefix;
// var repqnameprefix = kafka_settings.apiservice.reply_queue_prefix;
// var rep_topic = repqnameprefix + clientId;


// var HighLevelProducer = kafka.HighLevelProducer;
// var client = new kafka.Client(kafka_settings.client.connectionString, clientId, kafka_settings.client.zkOptions);
// //var count = 10;
// var rets = 0;
// var producer = new HighLevelProducer(client, kafka_settings.producer);
// var Consumer = kafka.Consumer,
//     client2 = new kafka.Client(kafka_settings.client.connectionString, clientId, kafka_settings.client.zkOptions),
//     consumer = new Consumer(
//         client2,
//         [
//             { topic: rep_topic }
//         ],
//         kafka_settings.consumer
//     );

// producer.on('error', function (err) {
//     global.log.error('Kafka producer error', err);
// });

// consumer.on('error', function (err) {
//     global.log.error('Kafka client error', err);
// });

// /*
//  * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
//  */
// consumer.on('offsetOutOfRange', function (topic) {
//     topic.maxNum = 2;
//     offset.fetch([topic], function (err, offsets) {
//         if (err) {
//             return global.log.error(err);
//         }
//         var min = Math.min(offsets[topic.topic][topic.partition]);
//         consumer.setOffset(topic.topic, topic.partition, min);
//     });
// });

// consumer.on('message', function (message) {
//     var jsonObj = JSON.parse(message.value);
//     //console.log('Received', jsonObj.messageid, message.value);
//     //console.log('Callbacks', JSON.stringify(map));

//     var state = map.get(jsonObj.messageid);
//     if (state) {
//         if (!jsonObj.response) {
//             global.log.error("ERROR: Message format invalid!", JSON.stringify(jsonObj));
//             return;
//         }
//         state.set('result', jsonObj.response);
//     } else {
//         global.log.error('No state for message', jsonObj.messageid);
//     }
// });


// consumer.on('ready', function () {
//     return global.log.error("Connected to Kafka");

// });

// producer.on('ready', function () {
//     global.log.error("%s Connected to Kafka", clientId);
// });


// var sendToKafka = function (topic, message, callback) {

//     /*if(!channel){
//         return callback({
//             error: true,
//             status: 500,
//             message: 'Could not connect to Kafka'
//         });
//     }*/


//     var data = JSON.stringify(message);
//     producer.send([
//         {topic: topic, messages: [data]}
//     ], function (err, rdata) {
//         if (err) {
//             if(err.name && (err.name == 'BrokerNotAvailableError')){
//                 // Have to retry, maybe electing leader
//                 producer.send([
//                     {topic: topic, messages: [data]}
//                 ], function (err, rdata) {
//                     if (err) {
//                         global.log.error(err);
//                         callback(err)
//                     }
//                     else
//                         global.log.debug('sent %d messages', ++rets);
//                     //if (rets === count) process.exit();
//                 });

//             } else if(err){
//                 global.log.error(err);
//                 callback(err);
//             }
//         }
//         else
//             global.log.debug('sent %d messages', ++rets);
//         //if (rets === count) process.exit();
//     });


// };

// exports.Send = function (service, msg, callback) {

//     var replyto = repqnameprefix + clientId;

//     if (!(service in kafka_settings.topics)) {
//         global.log.error("Unknown service ", service, " for topics ", JSON.stringify(kafka_settings.topics));
//         return;
//     }

//     var topic = kafka_settings.topics[service];

//     msg.instanceid = clientId;
//     msg.responsetopic = replyto;
//     msg.timestamp = new Date().toISOString();

//     var data = {
//         messageid: uuid.v4(),
//         request: msg
//     };

//     global.log.info('[%s] Sending message id=%s to topic=%s', clientId, data.messageid, topic);

//     var freezer = new Freezer({starttime: msg.timestamp});
//     var state = freezer.get();
//     map.set(data.messageid, state);

//     freezer.on('update', function (newValue) {
//         var result = freezer.get().result;
//         global.log.info("interface <= microservices ", JSON.stringify(result));
//         (result.error) ? callback(result, null) : callback(null, result);
//         map.delete(data.messageid);
//     });

//     var cb = function(error, data){
//         global.log.info("Send callback", error, data);
//         if(error){
//             global.log.error(error);
//             callback(error, null);
//             map.delete(data.messageid);
//         }
//     };

//     // Send to microservice
//     global.log.info("Sending message to Kafka on topic ", topic, " ", JSON.stringify(data));
//     sendToKafka(topic, data, cb);
// };
