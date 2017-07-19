var config = {};

//Used in kafka_connector.js
config.kafka = {
    requestTopic: 'requestTopic',
    producerOptions: { requireAcks: 1,  ackTimeoutMs: 1000, partitionerType: 2 },
    consumerPayload: [{topic: 'requestTopic', partition: 0}], //TODO - Change the topic to response topic name
    consumerOptions: { autoCommit: false, fromOffset: true }
}

module.exports = config;
