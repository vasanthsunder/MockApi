'use strict';

var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var client = new Client('localhost:2181');
var argv = require('optimist').argv;

//requireAcks=0 If set to zero then the producer will not wait for any acknowledgment from the server at all. The record will be immediately added to the socket buffer and considered sent. No guarantee can be made that the server has received the record in this case, and the retries configuration will not take effect (as the client won't generally know of any failures). The offset given back for each record will always be set to -1.
//requireAcks=1 This will mean the leader will write the record to its local log but will respond without awaiting full acknowledgement from all followers. In this case should the leader fail immediately after acknowledging the record but before the followers have replicated it then the record will be lost.
//requireAcks=-1 This means the leader will wait for the full set of in-sync replicas to acknowledge the record. This guarantees that the record will not be lost as long as at least one in-sync replica remains alive. This is the strongest available guarantee. This is equivalent to the acks=-1 setting.

//ackTimeoutMs -- The amount of time in milliseconds to wait for all acks before considered, default 100ms

//retries=[0.....]Setting a value greater than zero will cause the client to resend any record whose send fails with a potentially transient error. Note that this retry is no different than if the client resent the record upon receiving the error.
var producer = new Producer(client, { requireAcks: -1,  ackTimeoutMs: 1000, retires: 2 });
var producerReady = false;
producer.on('ready', function () {
    producerReady = true;
});

producer.on('error', function (err) {
  console.log('producer error', err);
});

function produceGetPolicyCategoryMessage(topic, reqJson, callback) {
    var payloads = [
        { topic: topic, messages: JSON.stringify(reqJson), partition: 0 }
    ];
    if(producerReady) {    
        producer.send(payloads, function (err, data) {    
            console.log('producer send message: '+JSON.stringify(data));
            //data -- {<topicname>:{"0":<offset>}}
            callback(null, data);    
        });
    } else {
        callback(err);
    }
}

module.exports = {
    produceGetPolicyCategoryMessage: produceGetPolicyCategoryMessage
};