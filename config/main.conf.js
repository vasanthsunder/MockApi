var config = {};

//Used in kafka_connector.js
config.kafka = {
    requestTopic: 'parking.policy.request',
    responseTopic: 'parking.policy.response',
    producerOptions: { requireAcks: 1,  ackTimeoutMs: 1000, partitionerType: 2 },
    consumerPayload: [{topic: 'parking.policy.response', partition: 0}], //TODO - Change the topic to response topic name
    consumerOptions: { autoCommit: false, fromOffset: true }
}

module.exports = config;

