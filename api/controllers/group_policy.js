'use strict';

const uuidv1 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/group_policy.js'),
    response = require('./../helpers/response.js');
var config = require('./../../config/main.conf');
// var errorResponseHandle = requestHandler.errorResponseHandle();

//TODO - remove this when intergrated with actual Kafka

/**
 * Check swagger.yaml for the declaration of operationId policyAssociation
 * @param {*} req 
 * @param {*} res 
 */
function policyAssociation(req, res) {
    console.log('policyAssociation');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var associateGroupPolicyObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postAssociateRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    payLoad.request.configprops.ParkingGroupPolicyLink = associateGroupPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId policyDisassociation
 * @param {*} req 
 * @param {*} res 
 */
function policyDisassociation(req, res) {
    console.log('policyDisassociation');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var deassociateGroupPolicyObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postDeassociateRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    payLoad.request.configprops.ParkingGroupPolicyLink = deassociateGroupPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId associatedparkinggroups
 * @param {*} req 
 * @param {*} res 
 */
function associatedParkingGroups(req, res) {
    console.log('associatedParkingGroups');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getAssociatedParkingGroupsRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
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
 * Export these functions to use it from other JS
 */
module.exports = {
    policyAssociation: policyAssociation,
    policyDisassociation: policyDisassociation,
    associatedParkingGroups: associatedParkingGroups
};