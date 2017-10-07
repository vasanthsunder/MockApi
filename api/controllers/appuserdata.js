'use strict';

const uuidv1 = require('uuid/v4');

var kafkaConnector = require('./../dsi/kafka_connector'),
    requestHandler = require('./../models/appuserdata.js'),
    response = require('./../helpers/response.js');
var config = require('./../../config/main.conf');

module.exports = {
    createAppUserData: createAppUserData,
    deleteAppUserData: deleteAppUserData,
    getAllAppUserData: getAllAppUserData,
    getAppUserData: getAppUserData,
    updateAppUserData: updateAppUserData
};

/**
 * Check swagger.yaml for the declaration of operationId createAppUserData
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function createAppUserData(req, res) {
    console.log('createAppUserData');
    var params = req.swagger.params;
    var appid = params.appid.value;
    var userid = params.userid.value;
    var datavalue = req.body.datavalue;
    // for unique messages we can overide the message id here
    var messageId = uuidv1(); // ⇨ 'af3da1c0-5cd9-11e7-8401-fb7c0283f80c' (based on timestamp)
    //Construct the payload that has to be sent to Kafka
    var payLoad = requestHandler.postRequestHandle();
    payLoad.messageid = messageId;
    payLoad.request.appuserdataprops.appid = appid;
    payLoad.request.appuserdataprops.userid = userid;

     payLoad.request.appuserdataprops.datavalue=datavalue
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.userDataRequestTopic, payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId getAllAppUserData
 * @param {*} req 
 * @param {*} res 
 */
function getAllAppUserData(req, res) {

    console.log('getAllAppUserData');
    var params = req.swagger.params;
    var appid = params.appid.value;
    var userid = params.userid.value;
    var messageId = uuidv1();

    var payLoad = requestHandler.getAllRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.appuserdataprops.appid = appid;
    payLoad.request.appuserdataprops.userid = userid;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.userDataRequestTopic, payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId getAppUserData
 * @param {*} req -- includes the request params
 * @param {*} res 
 */
function getAppUserData(req, res) {

    console.log('getAllAppUserData');
    var params = req.swagger.params;
    var appid = params.appid.value;
    var userid = params.userid.value;
    var userdataid = params.userdataid.value;
    var messageId = uuidv1();

    var payLoad = requestHandler.getRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.appuserdataprops.appid = appid;
    payLoad.request.appuserdataprops.userid = userid;
    payLoad.request.appuserdataprops.userdataid = userdataid;
    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.userDataRequestTopic, payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId updateAppUserData
 * @param {*} req 
 * @param {*} res 
 */
function updateAppUserData(req, res) {
    console.log('updateAppUserData');
    var params = req.swagger.params;
    var appid = params.appid.value;
    var userid = params.userid.value;
    var userdataid = params.userdataid.value;
    var datavalue = req.body.datavalue;
    var messageId = uuidv1();

    var payLoad = requestHandler.updateRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.appuserdataprops.appid = appid;
    payLoad.request.appuserdataprops.userid = userid;
    payLoad.request.appuserdataprops.userdataid = userdataid;
    payLoad.request.appuserdataprops.datavalue=datavalue


    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.userDataRequestTopic, payLoad, function (err, msg) {
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
 * Check swagger.yaml for the declaration of operationId deleteAppUserData
 * @param {*} req 
 * @param {*} res 
 */
function deleteAppUserData(req, res) {
    console.log('deleteAppUserData');
    var params = req.swagger.params;
    var appid = params.appid.value;
    var userid = params.userid.value;
    var userdataid = params.userdataid.value;
    var messageId = uuidv1();

    var payLoad = requestHandler.deleteRequestHandle();
    payLoad.messageid = messageId; // for unique messages we can overide the message id here
    payLoad.request.appuserdataprops.appid = appid;
    payLoad.request.appuserdataprops.userid = userid;
    payLoad.request.appuserdataprops.userdataid = userdataid;

    //Send the message to Kafka. 
    kafkaConnector.produceKafkaMessage(config.kafka.userDataRequestTopic, payLoad, function (err, msg) {
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

