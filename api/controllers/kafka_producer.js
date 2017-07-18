'use strict';

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var client = new Client('localhost:2181');
var argv = require('optimist').argv;

var producer = new Producer(client, { requireAcks: 1 });
var producerReady = false;
producer.on('ready', function () {
    producerReady = true;
});

producer.on('error', function (err) {
  console.log('producer error', err);
});

function produceGetPolicyCategoryMessage(topic, reqJson, callback) {
    console.log('topic: '+topic);
    var payloads = [
        { topic: topic, messages: JSON.stringify(reqJson), partition: 0}
    ];
    if(producerReady) {    
        producer.send(payloads, function (err, data) {    
            callback(null, data);    
        });
    } else {
        callback(err);
    }
}

module.exports = {
    produceGetPolicyCategoryMessage: produceGetPolicyCategoryMessage
};