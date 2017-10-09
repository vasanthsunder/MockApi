'use strict';

const uuidv4 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/group_policy.js'),
    response = require('./../helpers/response.js'),
    config = require('./../../config/main.conf');

/**
 * Check swagger.yaml for the declaration of operationId policyAssociation
 * @param {*} req 
 * @param {*} res 
 */
function policyAssociation(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var associateGroupPolicyObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postAssociateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    payLoad.request.configprops.ParkingGroupPolicyLink = associateGroupPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}


/**
 * Check swagger.yaml for the declaration of operationId policyDisassociation
 * @param {*} req 
 * @param {*} res 
 */
function policyDisassociation(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var deassociateGroupPolicyObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postDeassociateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    payLoad.request.configprops.ParkingGroupPolicyLink = deassociateGroupPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId associatedparkinggroups
 * @param {*} req 
 * @param {*} res 
 */
function associatedParkingGroups(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getAssociatedParkingGroupsRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestPolicyGroupTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
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