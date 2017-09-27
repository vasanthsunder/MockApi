'use strict';
module.exports = {
    getRequestHandle: getRequestHandle,
    postRequestHandle: postRequestHandle,
    getAllRequestHandle: getAllRequestHandle,
    deleteRequestHandle: deleteRequestHandle,
    updateRequestHandle: updateRequestHandle,
};

/**
 * Returns the getRequestHandle for the appuserdata 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getRequestHandle() {
    var getRequestHandle = {  
        "messageid":"4262c984-a84b-4442-a617-49399d0a3865",
        "responsetopic":"parking.appuserdata.req",
        "request":{  
           "instanceid":"c169ef50-42c9-42f3-b1c9-754242387235",
           "requestid":"c169ef50-42c9-42f3-b1c9-754242387235",
           "timestamp":"2017-07-20T19:50:28.866Z",
           "type":"getAppUserData",
           "model":"getSensorHistoryFromTo",
           "action":"CAN_READ",
           "user":"b401a642-7f00-4760-8ccf-c3b9df4b438a",
           "appuserdataprops":{  
              "appid":"123",
              "userid":"123",
              "userdataid":"27fa445a-ad9c-4f5d-bbb5-cfd99bc579cb"
           }
        }
     }
     ;
    return getRequestHandle;
}

/**
 * Returns the postRequestHandle for the appuserdata 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function postRequestHandle() {
    var postRequestHandle = 
    {  
       "messageid":"4262c984-a84b-4442-a617-49399d0a3865",
       "responsetopic":"parking.appuserdata.req",
       "request":{  
          "instanceid":"c169ef50-42c9-42f3-b1c9-754242387235",
          "requestid":"c169ef50-42c9-42f3-b1c9-754242387235",
          "timestamp":"2017-07-20T19:50:28.866Z",
          "type":"createAppUserData",
          "model":"getSensorHistoryFromTo",
          "action":"CAN_READ",
          "user":"b401a642-7f00-4760-8ccf-c3b9df4b438a",
          "appuserdataprops":{  
             "appid":"123",
             "userid":"123",
             "dataValue":"json blob"
          }
       }
    };    

    return postRequestHandle;
}

function getAllRequestHandle() {
    var getAllRequestHandle = {  
        "messageid":"4262c984-a84b-4442-a617-49399d0a3865",
        "responsetopic":"parking.appuserdata.req",
        "request":{  
           "instanceid":"c169ef50-42c9-42f3-b1c9-754242387235",
           "requestid":"c169ef50-42c9-42f3-b1c9-754242387235",
           "timestamp":"2017-07-20T19:50:28.866Z",
           "type":"getAllAppUserData",
           "model":"getSensorHistoryFromTo",
           "action":"CAN_READ",
           "user":"b401a642-7f00-4760-8ccf-c3b9df4b438a",
           "appuserdataprops":{  
              "appid":"123",
              "userid":"123"
           }
        }
     };
    return getAllRequestHandle;
}

function deleteRequestHandle() {
    var deleteRequestHandle = {  
        "messageid":"4563ff61-aa91-4955-9da0-93e5ae4f0cb1",
        "responsetopic":"parking.appuserdata.req",
        "request":{  
           "instanceid":"64e260e2-af09-4e28-a1c9-bddf947213bc",
           "requestid":"000f215a-ace2-4684-8c42-fa8a1e5efc61",
           "timestamp":"2017-07-20T20:26:31.783Z",
           "type":"deleteAppUserData",
           "model":"getSensorHistoryFromTo",
           "action":"CAN_READ",
           "user":"6b4f4f0c-95e9-4e5d-a258-f460985dfde6",
           "appuserdataprops":{  
              "appid":"123",
              "userid":"123",
              "userdataid":"27fa445a-ad9c-4f5d-bbb5-cfd99bc579cb"
           }
        }
     };
    return deleteRequestHandle;
}

function updateRequestHandle() {
    var updateRequestHandle = {  
        "messageid":"4262c984-a84b-4442-a617-49399d0a3865",
        "responsetopic":"parking.appuserdata.req",
        "request":{  
           "instanceid":"c169ef50-42c9-42f3-b1c9-754242387235",
           "requestid":"c169ef50-42c9-42f3-b1c9-754242387235",
           "timestamp":"2017-07-20T19:50:28.866Z",
           "type":"updateAppUserData",
           "model":"getSensorHistoryFromTo",
           "action":"CAN_READ",
           "user":"b401a642-7f00-4760-8ccf-c3b9df4b438a",
           "appuserdataprops":{  
              "appid":"123",
              "userid":"123",
              "userdataid":"27fa445a-ad9c-4f5d-bbb5-cfd99bc579cb",
              "dataValue":"json blob"
           }
        }
     };
    return updateRequestHandle
}