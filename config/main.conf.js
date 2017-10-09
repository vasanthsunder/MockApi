var config = {};

//Used in kafka_connector.js
var kafkaservice = process.env.kafka_service || 'localhost';
var kafkaport = process.env.kafka_port || "9092";
var kafkaurl = kafkaservice+':'+kafkaport;
var kafka_host = process.env.kafka_host || kafkaurl;
var instance_id = 'IS-'+require('ip').address();

config.kafka = {    
    requestTopic: 'parking.policy.req',
    tagRequestTopic: 'parking.tag.req',
    userDataRequestTopic: 'parking.appuserdata.req',
    responseTopic: 'api.reply.interface',
    requestPolicyGroupTopic: 'parking.policygroup.req',
    client: {
        consumer: {
            id: instance_id + 'consumer',
            groupId: instance_id + 'consumer',
            kafkaHost: kafka_host,
            sessionTimeout: 30000,
            protocol: ['roundrobin'],
            fromOffset: 'latest',
            connectOnReady: true,
            fetchMaxBytes: 10 * 1024 * 1024,
            retries: 5000000,
            retryFactor: 1,
            connectTimeout: 10000,
            requestTimeout: 30000,
            autoConnect: true,
            retryMinTimeout: 1000,
            idleConnection: 15 * 24 * 60 * 60 * 1000,
            connectRetryOptions: {
                retries: 5000000,
                factor: 1,
                minTimeout: 1 * 1000,
                maxTimeout: 5 * 1000,
                randomize: true
            }
        },
        producer: {
            clientId: instance_id + 'producer',
            kafkaHost: kafka_host,
            connectTimeout: 10000,
            requestTimeout: 30000,
            autoConnect: true,
            idleConnection: 15 * 24 * 60 * 60 * 1000,
            connectRetryOptions: {
                retries: 5000000,
                factor: 1,
                minTimeout: 1 * 1000,
                maxTimeout: 5 * 1000,
                randomize: true
            }
        },
        zkOptions: {
            sessionTimeout: 30000,
            spinDelay : 1000,
            retries : 0
        }
    }
};
module.exports = config;