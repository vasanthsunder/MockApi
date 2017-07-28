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
    payLoad.request.configprops.uid = parkingpolicyId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
function getAllParkingPolicies(req, res) {
    console.log('getAllParkingPolicies');
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
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
    payLoad.request.configprops.uid = parkingPolicyId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
    payLoad.request.configprops.uid = parkingPolicyId;
    payLoad.request.configprops.policy = ParkingPolicyObject;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
 * Export these functions to use it from other JS
 */
module.exports = {
    getParkingPolicy: getParkingPolicy,
    createParkingPolicy: createParkingPolicy,
    getAllParkingPolicies: getAllParkingPolicies,
    deleteParkingPolicy: deleteParkingPolicy,
    updateParkingPolicy: updateParkingPolicy
};