'use strict';

const uuidv1 = require('uuid/v1');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/policy_tag.js'),
    response = require('./../helpers/response.js');
    var config = require('./../../config/main.conf');
// var errorResponseHandle = requestHandler.errorResponseHandle();

//TODO - remove this when intergrated with actual Kafka

/**
 * Check swagger.yaml for the declaration of operationId getTag
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getTag(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagId = params.tagid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' tagId:' + tagId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId getPolicyCategory: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tagid = tagId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId createTag
 * @param {*} req 
 * @param {*} res 
 */
function postTag(req, res) {
    console.log('postTag');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    tagObject.orgid = orgId;
    tagObject.siteid = siteId;
    var payLoad = requestHandler.postRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tag = tagObject;
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
 * Check swagger.yaml for the declaration of operationId getAllTags
 * @param {*} req 
 * @param {*} res 
 */
function getAllTags(req, res) {
    console.log('getAllTags');
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
 * Check swagger.yaml for the declaration of operationId deleteTag
 * @param {*} req 
 * @param {*} res 
 */
function deleteTag(req, res) {
    console.log('deleteTag');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagId = params.tagid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' tagId:' + tagId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId deleteTag: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tagid = tagId;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
        console.log('produceKafkaMessage err: ' + err + ' message: ' + msg);
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
 * Check swagger.yaml for the declaration of operationId updateTag
 * @param {*} req 
 * @param {*} res 
 */
function updateTag(req, res) {
    console.log('updateTag');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var tagId = params.tagid.value;
    var tagObject = req.body;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' tagId:' + tagId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId updateTag: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.tagid = tagId;
    payLoad.request.configprops.tag = tagObject;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.requestTopic,payLoad, function (err, msg) {
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
    getTag: getTag,
    postTag: postTag,
    getAllTags: getAllTags,
    deleteTag: deleteTag,
    updateTag: updateTag
};