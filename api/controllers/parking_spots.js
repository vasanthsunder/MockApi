'use strict';

const uuidv4 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/parking_spots.js'),
    response = require('./../helpers/response.js'),
    config = require('./../../config/main.conf');

/**
 * Check swagger.yaml for the declaration of operationId getMetadataForParkingSpot
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getMetadataForParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingspotId = params.parkingspotid.value;
    var messageId = uuidv4();
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getMetadataForParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingspotid = parkingspotId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });

}


/**
 * Check swagger.yaml for the declaration of operationId createMetadataForParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function createMetadataForParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingSpotObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.createMetadataForParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingSpot = parkingSpotObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllMetadataForParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function getAllMetadataForParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var messageId = uuidv4();

    var payLoad = requestHandler.getAllMetadataForParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId deleteMetadataForParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function deleteMetadataForParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingspotId = params.parkingspotid.value;
    var messageId = uuidv4();
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteMetadataForParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingspotid = parkingspotId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId updateMetadataForParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function updateMetadataForParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingspotId = params.parkingspotid.value;
    var parkingSpotObject = req.body;

    var messageId = uuidv4();
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateMetadataForParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingspotid = parkingspotId;
    payLoad.request.configprops.parkingSpot = parkingSpotObject;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}
/**
 * Export these functions to use it from other JS
 */
module.exports = {
    getMetadataForParkingSpot: getMetadataForParkingSpot,
    createMetadataForParkingSpot: createMetadataForParkingSpot,
    getAllMetadataForParkingSpot: getAllMetadataForParkingSpot,
    deleteMetadataForParkingSpot: deleteMetadataForParkingSpot,
    updateMetadataForParkingSpot: updateMetadataForParkingSpot
};