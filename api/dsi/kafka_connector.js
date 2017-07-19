'use strict';

/** 
 *  All the communication to Kafka happens here.
 *  As of now, only producer and consumer is being used to send and receive messages from Kafka.  
 */

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;
var Client = kafka.Client;
var client = new Client('localhost:2181');

var config = require('./../../config/main.conf');

var producer = new Producer(client, config.kafka.producerOptions);
var consumer;

var producerReady = false;

producer.on('ready', function () {
    producerReady = true;    
    // Create topics async
    producer.createTopics([config.kafka.requestTopic], function (err, data) {
        consumer = new Consumer(client, config.kafka.consumerPayload, config.kafka.consumerOptions);  
        //Adding this to make sure the consumer.on('message') is called
        consumer.pause();
        console.log('Topics created: '+data);
    });
});

producer.on('error', function (err) {
  console.log('producer error', err);
});

/**
 * To send message (Json payload) to Kafka 
 * 
 * @param {*} reqJson -- request JSON
 * @param {*} callback 
 */
function produceGetPolicyCategoryMessage(reqJson, callback) {
    var payloads = [
        { topic: config.kafka.requestTopic, messages: JSON.stringify(reqJson), partition: 0 }
    ];
    if(producerReady) {    
        producer.send(payloads, function (err, data) {
            //data -- {<topicname>:{"0":<offset>}}
            if(err){
                callback(err)
            } else {
                callback(null, data);                
            }
        });
    } else {
        callback(err);
    }
}

/**
 * To get the response from Kafka for the request posted 
 * 
 * @param {*} messageId - message ID sent in the request
 * @param {*} callback 
 */
function getPolicyCategoryConsumer(messageId, callback) {        
    consumer.resume();
    consumer.on('message', function (message) {    
        //console.log('message: '+JSON.stringify(message));            
        var data = JSON.parse(message.value);
        console.log('messageId: '+messageId);
        console.log('data.messageid: '+data.messageid);
        if(data.messageid == messageId) {
            console.log('actual data: '+JSON.stringify(data));
            callback(null, data);
        }
        consumer.pause();        
    });
    consumer.on('error', function(err){
        callback(err);
    });
}

/**
 * Export these functions to use it from controllers
 */
module.exports = {
    produceGetPolicyCategoryMessage: produceGetPolicyCategoryMessage,
    getPolicyCategoryConsumer: getPolicyCategoryConsumer
};