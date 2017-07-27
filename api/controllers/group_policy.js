'use strict';

const uuidv1 = require('uuid/v1');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/group_policy.js'),
    response = require('./../helpers/response.js');
// var errorResponseHandle = requestHandler.errorResponseHandle();

//TODO - remove this when intergrated with actual Kafka

/**
 * Check swagger.yaml for the declaration of operationId policyassociation
 * @param {*} req 
 * @param {*} res 
 */
function policyassociation(req, res) {
    console.log('policyassociation');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var associateGroupPolicyObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postAssociateRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.ParkingGroupPolicyLink = associateGroupPolicyObject;
    console.log(associateGroupPolicyObject, '@@@@@@@@@@@@@@@@@@@');
    console.log("payload that we send @@@@", JSON.stringify(payLoad));
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId policydisassociation
 * @param {*} req 
 * @param {*} res 
 */
function policydisassociation(req, res) {
    console.log('policydisassociation');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var deassociateGroupPolicyObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postDeassociateRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.ParkingGroupPolicyLink = deassociateGroupPolicyObject;
    console.log(deassociateGroupPolicyObject, '@@@@@@@@@@@@@@@@@@@');
    console.log("payload that we send @@@@", JSON.stringify(payLoad));
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(payLoad, function (err, msg) {
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
    policyassociation: policyassociation,
    policydisassociation: policydisassociation
};