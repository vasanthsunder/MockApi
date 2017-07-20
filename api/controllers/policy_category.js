'use strict';

var kafkaConnector = require('./../dsi/kafka_connector'),
    response = require('./../helpers/response.js');

//TODO - remove this when intergrated with actual Kafka
var reqJson = {  
   "messageid":"da4067d5-7532-40d1-8763-9f19f02d4f9H",
   "request":{  
      "instanceid":"75b3e303-ec4f-4643-b483-f98d975a5d24",
      "responsetopic":"parking.policy.request",
      "requestid":"291ef868-2bd0-4350-ac87-3591039bb397",
      "timestamp":"2017-07-12T02:33:19.491Z",
      "type":"getParkingCategory",
      "model":"getSensorHistoryFromTo",
      "action":"CAN_READ1",
      "user":"0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
      "orgprops":{  
         "orgid":"d8547b37-95ba-410d-9382-0b190d951332"
      },
      "siteprops":{  
         "siteid":"d8547b37-95ba-410d-9382-0b190d951332"
      },
      "configprops":{  
         "uid":"534602bf-1d76-43b0-adcb-c5d932580e05"
      }
   }
}

var reqJsonPost = {  
   "messageid":"da4067d5-7532-40d1-8763-9f19f02d4f9e777",
   "request":{  
      "instanceid":"75b3e303-ec4f-4643-b483-f98d975a5d24",
      "responsetopic":"parking.policy.request",
      "requestid":"291ef868-2bd0-4350-ac87-3591039bb397",
      "timestamp":"2017-07-12T02:33:17.052Z",
      "type":"postParkingCategory",
      "model":"getSensorHistoryFromTo",
      "action":"CAN_READ",
      "user":"0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
      "orgprops":{  
         "orgid":"d8547b37-95ba-410d-9382-0b190d951332"
      },
      "siteprops":{  
         "siteid":"d8547b37-95ba-410d-9382-0b190d951332"
      },
      "configprops":{  
         "uid":"534602bf-1d76-43b0-adcb-c5d932580e05",
         "policycategory":{  
            "uid":null,
            "name":"name",
            "description":"desc",
            "orgid":"null",
            "siteid":"null",
            "createdon":null,
            "lastupdated":null,
            "isdeleted":null
         }
      }
   }
}

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

    console.log('orgId:'+orgId+' siteId:'+siteId+' policyCategoryId:'+policyCategoryId);

    var messageId = reqJson.messageid;
    //Construct the payload that has to be sent to Kafka


    //Send the message to Kafka. 
    kafkaConnector.producePolicyCategoryMessage(reqJson, function(err, msg){        
        console.log('err: '+err+ ' message: '+msg);
        if(!err){
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
                response.Done(err, msg, res, req);
           });
        } else {
            response.Done(err, msg, res, req);
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
    var policyCategoryObject = req.body;
    console.log('params: '+JSON.stringify(params));
    console.log('/*********************************************/');
    console.log('policyCategoryObject: '+JSON.stringify(policyCategoryObject));

    var messageId = reqJsonPost.messageid;
    //Construct the payload that has to be sent to Kafka


    //Send the message to Kafka. 
    kafkaConnector.producePolicyCategoryMessage(reqJsonPost, function(err, msg){        
        console.log('err: '+err+ ' message: '+msg);
        if(!err){
            kafkaConnector.consumePolicyCategoryMessage(messageId, function (err, msg) {
                response.Done(err, msg, res, req);
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
  createPolicyCategory: createPolicyCategory
};
