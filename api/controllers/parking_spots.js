'use strict';

const uuidv1 = require('uuid/v1');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/parking_spots.js'),
    response = require('./../helpers/response.js');
    var config = require('./../../config/main.conf');
// var errorResponseHandle = requestHandler.errorResponseHandle();

//TODO - remove this when intergrated with actual Kafka

/**
 * Check swagger.yaml for the declaration of operationId GetParkingSpot
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingspotId = params.parkingspotid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkingspotId:' + parkingspotId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId getParkingSpot: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingspotid = parkingspotId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic,payLoad, function (err, msg) {
        console.log('produceKafkaMessage err: ' + err + ' message: ' + msg);
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
 * Check swagger.yaml for the declaration of operationId postParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function postParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingSpotObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postParkingSpotRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingSpot = parkingSpotObject;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic,payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId getAllParkingSpots
 * @param {*} req 
 * @param {*} res 
 */
function getAllParkingSpots(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var messageId = uuidv1();
    // console.log('orgId:' + orgId + ' siteId:' + siteId);

    var payLoad = requestHandler.getAllParkingSpotsRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic,payLoad, function (err, msg) {
        console.log("vasanth here @@@",JSON.stringify(payLoad));
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
 * Check swagger.yaml for the declaration of operationId deleteParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function deleteParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingspotId = params.parkingspotid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkingspotId:' + parkingspotId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId deleteTag: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingspotid = parkingspotId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic,payLoad, function (err, msg) {
        console.log('produceKafkaMessage err: ' + err + ' message: ' + msg);
        // console.log("payload message", payLoad);
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
 * Check swagger.yaml for the declaration of operationId updateParkingSpot
 * @param {*} req 
 * @param {*} res 
 */
function updateParkingSpot(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var parkingspotId = params.parkingspotid.value;
    var parkingSpotObject = req.body;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' parkingspotId:' + parkingspotId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId updateTag: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateParkingSpotRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.parkingspotid = parkingspotId;
    payLoad.request.configprops.parkingSpot = parkingSpotObject;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic,payLoad, function (err, msg) {
        console.log('produceKafkaMessage err: ' + err + ' message: ' + msg);
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
    getParkingSpot: getParkingSpot,
    postParkingSpot: postParkingSpot,
    getAllParkingSpots: getAllParkingSpots,
    deleteParkingSpot: deleteParkingSpot,
    updateParkingSpot: updateParkingSpot
};