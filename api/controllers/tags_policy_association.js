'use strict';

const uuidv4 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/tags_policy_association.js'),
    response = require('./../helpers/response.js'),
    config = require('./../../config/main.conf');

/**
 * Check swagger.yaml for the declaration of operationId policyTagsAssociation
 * @param {*} req 
 * @param {*} res 
 */
function policyTagsAssociation(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var associateTagsPolicyObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postTagsAssociateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    payLoad.request.configprops.tagspolicylink = associateTagsPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}


/**
 * Check swagger.yaml for the declaration of operationId policyTagsDisassociation
 * @param {*} req 
 * @param {*} res 
 */
function policyTagsDisassociation(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyId = params.parkingpolicyid.value;
    var deassociateTagsPolicyObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postTagsDisassociateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policyid = policyId;
    payLoad.request.configprops.tagspolicylink = deassociateTagsPolicyObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.requestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Export these functions to use it from other JS
 */
module.exports = {
    policyTagsAssociation: policyTagsAssociation,
    policyTagsDisassociation: policyTagsDisassociation
};