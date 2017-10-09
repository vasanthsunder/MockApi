'use strict';

const uuidv4 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/parking_policy.js'),
    response = require('./../helpers/response.js'),
    config = require('./../../config/main.conf');

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
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingpolicyId;    
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });

}


/**
 * Check swagger.yaml for the declaration of operationId createParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function createParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var ParkingPolicyObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    ParkingPolicyObject.orgid = orgId;
    ParkingPolicyObject.siteid = siteId;
    var payLoad = requestHandler.postRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policy = ParkingPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function getAllParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var messageId = uuidv4();

    var payLoad = requestHandler.getAllRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;

    console.log("############ GetAll Policies - BEFORE ##########", new Date().toISOString());
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        console.log("############ GetAll Policies - AFTER ##########", new Date().toISOString());
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId deleteParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function deleteParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingPolicyId = params.parkingpolicyid.value;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingPolicyId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId updateParkingPolicy
 * @param {*} req 
 * @param {*} res 
 */
function updateParkingPolicy(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingPolicyId = params.parkingpolicyid.value;
    var ParkingPolicyObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingPolicyId;
    payLoad.request.configprops.policy = ParkingPolicyObject;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandleByVersion();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingpolicyId;
    payLoad.request.configprops.version = version;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandleByVersionHistory();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = parkingpolicyId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandleByTimeline();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.fromtime = fromTime;
    payLoad.request.configprops.totime = toTime;
    payLoad.request.configprops.parkinggroupid = parkinggroupId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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
    var messageId = uuidv4();
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getActiveParkingPolicyRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;;
    payLoad.request.configprops.parkinggroupid = parkinggroupId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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
    var messageId = uuidv4();
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postSearchPolicyRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;;
    payLoad.request.configprops.searchPayload = searchGroupPolicyObject;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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