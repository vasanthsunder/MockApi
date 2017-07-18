'use strict';

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
var client = new Client('localhost:2181');

/* Print latest offset. */
var offset = new Offset(client);

var util = require('util'),
    producer = require('./kafka_producer'),
    consumer = require('./kafka_consumer'),
    response = require('./../helpers/response.js');

module.exports = {
  getPolicyCategory: getPolicyCategory
};

var reqJson = {  
   "messageid":"da4067d5-7532-40d1-8763-9f19f02d4f9e",
   "request":{  
      "instanceid":"75b3e303-ec4f-4643-b483-f98d975a5d24",
      "responsetopic":"parking.policy.request",
      "requestid":"291ef868-2bd0-4350-ac87-3591039bb397",
      "timestamp":"2017-07-12T02:33:19.491Z",
      "type":"getParkingCategory",
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
         "uid":"534602bf-1d76-43b0-adcb-c5d932580e05"
      }
   }
}

var resJson = {  
    "messageid":"1c6c5c9c-970b-43f9-8b93-fdacc162faeb",
    "response":{  
        "requestid":"ed7fbfb8-cbcc-4cbd-87b6-c7bea4008814",
        "timestamp":"2017-07-12T02:24:19.172Z",
        "success":true,
        "result":{  
            "uid":"534602bf-1d76-43b0-adcb-c5d932580e05",
            "name":"name",
            "description":"desc",
            "orgid":"d8547b37-95ba-410d-9382-0b190d951332",
            "siteid":"d8547b37-95ba-410d-9382-0b190d951332",
            "createdon":1499826169162,
            "lastupdated":1499826169162,
            "isdeleted":false
        }
    }
}

var getPolicyCategoryReqTopic = 'getPolicyCategoryReqTopic';

var latestOffset = 0;

function getPolicyCategory(req, res) {
    var params = req.swagger.params;
    var orgId = params.orgid.value;
    var siteId = params.siteid.value;
    var policyCategoryId = params.policycategoryid.value;

    console.log('orgId:'+orgId+' siteId:'+siteId+' policyCategoryId:'+policyCategoryId);

    //Send the message to Kafka. 
    producer.produceGetPolicyCategoryMessage(getPolicyCategoryReqTopic, reqJson, function(err, msg){
        console.log('err: '+err+ ' message: '+msg);
    });

    //Consume the response from Kafka
    consumer.getPolicyCategoryConsumer(getPolicyCategoryReqTopic, function (err, msg) {
        response.Done(err, msg, res, req);
    });
}