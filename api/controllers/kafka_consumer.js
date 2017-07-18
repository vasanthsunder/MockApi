'use strict';

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
var argv = require('optimist').argv;
//var topic = argv.topic || 'topic1';

var client = new Client('localhost:2181');

/* Print latest offset. */
var offset = new Offset(client);
let latestOffset = 0;
function getPolicyCategoryConsumer(getPolicyCategoryReqTopic, callback) {
    
     offset.fetch([{ topic: getPolicyCategoryReqTopic, partition: 0, time: -1 }], function (err, data) {
        console.log('err: '+err+' data: '+data);
        latestOffset = data[getPolicyCategoryReqTopic]['0'] - 1;
        console.log("Consumer current offset: " + latestOffset);
        var consumer = new Consumer(client,
            [{ topic: getPolicyCategoryReqTopic, partition: 0, offset: latestOffset }],
            { autoCommit: false, fromOffset: true }
        );
        consumer.resume();
        consumer.on('message', function (message) {                
            var data = JSON.parse(message.value);
            console.log('actual data: '+JSON.stringify(data));
            //res.json(data);
            consumer.pause();
            callback(null, data);
        });
        consumer.on('error', function (err) {
            console.log('consumer error', err);
        });
    });
}

module.exports = {
   getPolicyCategoryConsumer: getPolicyCategoryConsumer
};

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*
consumer.on('offsetOutOfRange', function (topic) {
  topic.maxNum = 2;
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return console.error(err);
    }
    var min = Math.min(offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});
*/