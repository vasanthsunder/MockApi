'use strict';
var configManager = require('kea-config'),
    Freezer = require('freezer-js'),
    Map = require('collections/map'),
    uuid = require('uuid'),
    kafka = require('kafka-node');
;

configManager.init('./config/main.conf.js');

var map = new Map({});


var kafka_settings = configManager.get('kafka');
var clientId = kafka_settings.client.clientId;
var rep_topic = kafka_settings.responseTopic;


var HighLevelProducer = kafka.HighLevelProducer;
var Client = kafka.Client;
var KafkaClient = kafka.KafkaClient;
var producerClient = new KafkaClient(kafka_settings.client.producer);
var rets = 0;
var Offset = kafka.Offset;
var offset = new Offset(producerClient);
var producer = new HighLevelProducer(producerClient, kafka_settings.producer);
producerClient.on('close', function () {
    try {
        producerClient.connect();
    } catch (e) {
        console.log('Producer client error reconnecting', e);
    }
});


var Consumer = kafka.ConsumerGroup;
var topics = [rep_topic];
var consumerGroup = new Consumer(kafka_settings.client.consumer, topics);

consumerGroup.on('close', function () {
    consumerGroup.scheduleReconnect(1000);
});

producer.on('error', function (err) {
    console.log('Kafka producer error', err);
});

consumerGroup.on('error', function (err) {
    console.log('Kafka consumer error', err);
});

consumerGroup.on('message', function (message) {
    try {
        var jsonObj = JSON.parse(message.value);

        var state = map.get(jsonObj.messageid);
        if (state) {
            if (!jsonObj.response) {
                console.log("ERROR: Message format invalid!", JSON.stringify(jsonObj));
                return;
            }
            state.set('result', jsonObj.response);
        } else {
            console.log('No state for message', jsonObj.messageid);
        }
    } catch (e) {
        console.log('Error processing MS response', e.message);
    }
});

producer.on('ready', function () {
    console.log("%s Producer connected to Kafka", kafka_settings.client.producer.clientId);
});


var sendToKafka = function (topic, message, callback) {
    var data = JSON.stringify(message);
    producer.send([
        { topic: topic, messages: [data], timestamp: Date.now() }
    ], function (err, rdata) {
        if (err) {
            if (err.name && (err.name == 'BrokerNotAvailableError')) {
                // Have to retry, maybe electing leader
                producer.send([
                    { topic: topic, messages: [data] }
                ], function (err, rdata) {
                    if (err) {
                        console.log('producer send error', err);
                        callback(err)
                    }
                    else
                        console.log('sent %d messages', ++rets);
                });

            } else if (err) {
                console.log('producer send message error', err);
                callback(err);
            }
        }
        else
            console.log('sent %d messages', ++rets);
    });


};

exports.Send = function (requestTopic, msg, callback) {
    var requestObj = msg.request;
    requestObj.instanceid = kafka_settings.instance_id;
    requestObj.timestamp = new Date().toISOString();
    delete msg.messageid;
    delete msg.responsetopic;
    var requestObj = msg.request;
    var data = {
        messageid: uuid.v4(),
        responsetopic: rep_topic,
        request: requestObj
    };

    console.log('Sending message id=%s to topic=%s', data.messageid, requestTopic);

    var freezer = new Freezer({ starttime: msg.timestamp });
    var state = freezer.get();
    map.set(data.messageid, state);

    freezer.on('update', function (newValue) {
        var result = freezer.get().result;
        console.log("interface <= microservices ", JSON.stringify(result).substring(0,150));
        (result.error) ? callback(result, null) : callback(null, result);
        map.delete(data.messageid);
    });

    var cb = function (error, data) {
        if (error) {
            console.log(error);
            callback(error, null);
        }
    };

    console.log("Sending message to Kafka on topic ", requestTopic, " ", JSON.stringify(data));
    sendToKafka(requestTopic, data, cb);
};