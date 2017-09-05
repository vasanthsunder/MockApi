var config = {};

//Used in kafka_connector.js
config.kafka = {
    requestTopic: 'parking.policy.req',
    tagRequestTopic: 'parking.tag.req',
    responseTopic: 'api.reply.interface',
    requestPolicyGroupTopic: 'parking.policygroup.req',
    producerOptions: { requireAcks: 1,  ackTimeoutMs: 1000, partitionerType: 2 },
    consumerPayload: [{topic: 'api.reply.interface', partition: 0}], //TODO - Change the topic to response topic name
    consumerOptions: { autoCommit: false, fromOffset: true }
}

module.exports = config;