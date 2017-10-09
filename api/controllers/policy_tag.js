'use strict';

const uuidv4 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/policy_tag.js'),
    response = require('./../helpers/response.js'),
    config = require('./../../config/main.conf');

/**
 * Check swagger.yaml for the declaration of operationId getPolicyCategory
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getPolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagId = params.tagid.value;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tagid = tagId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.tagRequestTopic, payLoad, function (err, msg) {
        response.Done(err, res, res, req);
    });

}


/**
 * Check swagger.yaml for the declaration of operationId createTag
 * @param {*} req 
 * @param {*} res 
 */
function createPolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    tagObject.orgid = orgId;
    tagObject.siteid = siteId;
    var payLoad = requestHandler.postRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tag = tagObject;
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.tagRequestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllPolicyCategory
 * @param {*} req 
 * @param {*} res 
 */
function getAllPolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var messageId = uuidv4();
    // console.log('orgId:' + orgId + ' siteId:' + siteId);

    var payLoad = requestHandler.getAllRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    console.log("############ GetAll Tags - BEFORE ##########", new Date().toISOString());
    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.tagRequestTopic, payLoad, function (err, msg) {
        console.log("############ GetAll Tags - AFTER #############", new Date().toISOString());
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId deletePolicyCategory
 * @param {*} req 
 * @param {*} res 
 */
function deletePolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagId = params.tagid.value;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tagid = tagId;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.tagRequestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}

/**
 * Check swagger.yaml for the declaration of operationId updatePolicyCategory
 * @param {*} req 
 * @param {*} res 
 */
function updatePolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagId = params.tagid.value;
    var tagObject = req.body;
    var messageId = uuidv4();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tagid = tagId;
    payLoad.request.configprops.tag = tagObject;

    //Send the message to Kafka. 
    kafkaConnector.Send(config.kafka.tagRequestTopic, payLoad, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}
/**
 * Export these functions to use it from other JS
 */
module.exports = {
    getPolicyCategory: getPolicyCategory,
    createPolicyCategory: createPolicyCategory,
    getAllPolicyCategory: getAllPolicyCategory,
    deletePolicyCategory: deletePolicyCategory,
    updatePolicyCategory: updatePolicyCategory
};