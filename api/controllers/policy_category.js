'use strict';

const uuidv1 = require('uuid/v1');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/policy_category.js'),
    response = require('./../helpers/response.js');
// var errorResponseHandle = requestHandler.errorResponseHandle();

//TODO - remove this when intergrated with actual Kafka

/**
 * Check swagger.yaml for the declaration of operationId getPolicyCategory
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getPolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyCategoryId = params.policycategoryid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' policyCategoryId:' + policyCategoryId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId getPolicyCategory: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.getRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.uid = policyCategoryId;

    //Send the message to Kafka. 
    kafkaConnector.producePolicyCategoryMessage(payLoad, function (err, msg) {
        console.log('producePolicyCategoryMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, res, res, req);
        }
    });

}


/**
 * Check swagger.yaml for the declaration of operationId createPolicyCategory
 * @param {*} req 
 * @param {*} res 
 */
function createPolicyCategory(req, res) {
    console.log('createPolicyCategory');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyCategoryObject = req.body;
    var messageId = uuidv1();

    //Construct the payload that has to be sent to Kafka
    policyCategoryObject.orgid = orgId;
    policyCategoryObject.siteid = siteId;
    var payLoad = requestHandler.postRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.policycategory = policyCategoryObject;
    //Send the message to Kafka. 
    kafkaConnector.producePolicyCategoryMessage(payLoad, function (err, msg) {
        console.log('err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId getAllPolicyCategories
 * @param {*} req 
 * @param {*} res 
 */
function getAllPolicyCategories(req, res) {
    console.log('getAllPolicyCategories');
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
    kafkaConnector.producePolicyCategoryMessage(payLoad, function (err, msg) {
        console.log('err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId deletePolicyCategory
 * @param {*} req 
 * @param {*} res 
 */
function deletePolicyCategory(req, res) {
    console.log('deletePolicyCategory');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyCategoryId = params.policycategoryid.value;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' policyCategoryId:' + policyCategoryId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId deletePolicyCategory: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.deleteRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.uid = policyCategoryId;

    //Send the message to Kafka. 
    kafkaConnector.producePolicyCategoryMessage(payLoad, function (err, msg) {
        console.log('producePolicyCategoryMessage err: ' + err + ' message: ' + msg);
        console.log("payload meeesage", payLoad);
        if (!err) {
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
                response.Done(err, msg.response, res, req);
            });
        } else {
            response.Done(err, msg, res, req);
        }
    });
}

/**
 * Check swagger.yaml for the declaration of operationId updatePolicyCategory
 * @param {*} req 
 * @param {*} res 
 */
function updatePolicyCategory(req, res) {
    console.log('updatePolicyCategory');
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyCategoryId = params.policycategoryid.value;
    var policyCategoryObject = req.body;

    console.log('orgId:' + orgId + ' siteId:' + siteId + ' policyCategoryId:' + policyCategoryId);

    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    console.log('messageId updatePolicyCategory: ' + messageId);
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.updateRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.orgprops.orgid = orgId;
    payLoad.request.siteprops.siteid = siteId;
    payLoad.request.configprops.uid = policyCategoryId;
    payLoad.request.configprops.policycategory = policyCategoryObject;

    //Send the message to Kafka. 
    kafkaConnector.producePolicyCategoryMessage(payLoad, function (err, msg) {
        console.log('producePolicyCategoryMessage err: ' + err + ' message: ' + msg);
        if (!err) {
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
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
    getPolicyCategory: getPolicyCategory,
    createPolicyCategory: createPolicyCategory,
    getAllPolicyCategories: getAllPolicyCategories,
    deletePolicyCategory: deletePolicyCategory,
    updatePolicyCategory: updatePolicyCategory
};