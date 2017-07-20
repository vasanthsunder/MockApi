'use strict';
module.exports = {
    getRequestHandle: getRequestHandle,
    postRequestHandle: postRequestHandle
};

/**
 * Returns the getRequestHandle for the policy_category 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getRequestHandle() {
   var getRequestHandle = {  
   "messageid":"12345656",
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
         "uid":"534602bf-1d76-43b0-adcb-c5d932580e05",
         "policycategory":{  
            "uid":null
         }
      }
   }
};
return getRequestHandle;
}

/**
 * Returns the postRequestHandle for the policy_category 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function postRequestHandle() {
   var postRequestHandle = {  
   "messageid":"123456",
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


return postRequestHandle;
}
