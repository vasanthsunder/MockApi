'use strict';

/** 
 *  All the communication to Kafka happens here.
 *  As of now, only producer and consumer is being used to send and receive messages from Kafka.  
 */

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;
var Client = kafka.Client;
var config = require('./../../config/main.conf');
var kafkaClientHost = process.env.kafka_client_host || 'localhost';
var kafkaClientPort = process.env.kafka_client_port || 2181;
var client = new Client(kafkaClientHost + ':' + kafkaClientPort);
var producer = new Producer(client, config.kafka.producerOptions);
var consumer;
var producerReady = false;

producer.on('ready', function () {
    producerReady = true;
    // Create topics async
    producer.createTopics([config.kafka.requestTopic,config.kafka.requestPolicyGroupTopic, config.kafka.responseTopic], function (err, data) {
        consumer = new Consumer(client, config.kafka.consumerPayload, config.kafka.consumerOptions);
        console.log('Topics created: ' + data);
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
function produceKafkaMessage(requestTopic, reqJson, callback) {
    console.log('sending message to Kafka: ', reqJson);
    var payloads = [
        { topic: requestTopic, messages: JSON.stringify(reqJson), partition: 0 }
    ];
    if (producerReady) {
        producer.send(payloads, function (err, data) {
            if (err) {
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
function consumeKafkaMessage(messageId, callback) {
    consumer.on('message', function (message) {           
        var data = JSON.parse(message.value);
        console.log('messageId: ' + messageId);
        console.log('data.messageid: ' + data.messageid);
        if (data.messageid == messageId) {
            console.log('actual data: ' + JSON.stringify(data));
            callback(null, data);
        }
    });
    consumer.on('error', function (err) {
        callback(err);
    });
}

/**
 * Export these functions to use it from controllers
 */
module.exports = {
    produceKafkaMessage: produceKafkaMessage,
    consumeKafkaMessage: consumeKafkaMessage
};