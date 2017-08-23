'use strict';

const uuidv1 = require('uuid/v1');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/parking_policy.js'),
    response = require('./../helpers/response.js');
var config = require('./../../config/main.conf');
// var errorResponseHandle = requestHandler.errorResponseHandle();

//TODO - remove this when intergrated with actual Kafka

/**
 * Check swagger.yaml for the declaration of operationId getParkingPolicy
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingpolicyId = params.parkingpolicyid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkingpolicyId' + parkingpolicyId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId parkingpolicyId: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingpolicyId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });

}


/**
 * Check swagger.yaml for the declaration of operationId createParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function createParkingPolicy(req, res) {
    console.log('createParkingPolicy');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var ParkingPolicyObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    ParkingPolicyObject.orgid = orgId;
    ParkingPolicyObject.siteid = siteId;
    var payLoad = requestHandler.postRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policy = ParkingPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function getAllParkingPolicy(req, res) {
    console.log('getAllParkingPolicy');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var messageId = uuidv1();
    // console.log('orgId:' + orgId + ' siteId:' + siteId);

    var payLoad = requestHandler.getAllRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId deleteParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function deleteParkingPolicy(req, res) {
    console.log('deleteParkingPolicy');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingPolicyId = params.parkingpolicyid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' ParkingPolicyId:' + parkingPolicyId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId deleteParkingPolicy: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingPolicyId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        console.log("payload meeesage", payLoad);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId updateParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function updateParkingPolicy(req, res) {
    console.log('updateParkingPolicy');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingPolicyId = params.parkingpolicyid.value;
    var ParkingPolicyObject = req.body;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' ParkingPolicyId:' + parkingPolicyId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId updateParkingPolicy: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingPolicyId;
    payLoad.request.configprops.policy = ParkingPolicyObject;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getParkingPolicyVersion
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getParkingPolicyVersion(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingpolicyId = params.parkingpolicyid.value;
    var version = params.version.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkingpolicyId' + parkingpolicyId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId parkingpolicyId: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandleByVersion();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingpolicyId;
    payLoad.request.configprops.version = version;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllVersionsOfParkingPolicy
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getAllVersionsOfParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingpolicyId = params.parkingpolicyid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkingpolicyId' + parkingpolicyId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId parkingpolicyId: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandleByVersionHistory();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingpolicyId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllActiveParkingPolicyForPeriod
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getAllActiveParkingPolicyForPeriod(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkinggroupId = params.parkinggroupid.value;
    var fromTime = params.fromtime.value;
    var toTime = params.totime.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkinggroupId' + parkinggroupId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId parkinggroupId: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandleByTimeline();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.fromtime = fromTime;
    payLoad.request.configprops.totime = toTime;
    payLoad.request.configprops.parkinggroupid = parkinggroupId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getActiveParkingPolicy
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getActiveParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkinggroupId = params.parkinggroupid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkinggroupId' + parkinggroupId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId parkinggroupId: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getActiveParkingPolicyRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;;
    payLoad.request.configprops.parkinggroupid = parkinggroupId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId searchParkingPolicy
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function searchParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var searchGroupPolicyObject = req.body;

    console.log('orgId:' + orgId + ' siteId:' + siteId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId parkingpolicyId: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postSearchPolicyRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;;
    payLoad.request.configprops.searchPayload = searchGroupPolicyObject;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log('produceParkingPolicyMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumeKafkaMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });
}
/**
 * Export these functions to use it from other JS
 */
module.exports = {
    getParkingPolicy: getParkingPolicy,
    createParkingPolicy: createParkingPolicy,
    getAllParkingPolicy: getAllParkingPolicy,
    deleteParkingPolicy: deleteParkingPolicy,
    updateParkingPolicy: updateParkingPolicy,
    getParkingPolicyVersion: getParkingPolicyVersion,
    getAllVersionsOfParkingPolicy: getAllVersionsOfParkingPolicy,
    getAllActiveParkingPolicyForPeriod: getAllActiveParkingPolicyForPeriod,
    getActiveParkingPolicy: getActiveParkingPolicy,
    searchParkingPolicy: searchParkingPolicy
};