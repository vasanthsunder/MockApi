'use strict';
module.exports = {
    getRequestHandle: getRequestHandle,
    postRequestHandle: postRequestHandle,
    getAllRequestHandle: getAllRequestHandle,
    deleteRequestHandle: deleteRequestHandle,
    updateRequestHandle: updateRequestHandle,
    getResponseHandle: getResponseHandle,
    getAllResponseHandle: getAllResponseHandle,
    deleteResponseHandle: deleteResponseHandle,
    errorResponseHandle: errorResponseHandle
};

/**
 * Returns the getRequestHandle for the policy_category 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getRequestHandle() {
    var getRequestHandle = {
        "messageid": "12345656",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "responsetopic": "parking.policy.request",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:19.491Z",
            "type": "getParkingCategory",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "uid": "534602bf-1d76-43b0-adcb-c5d932580e05",
                "policycategory": {
                    "uid": null
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
        "messageid": "123456",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "responsetopic": "parking.policy.request",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:17.052Z",
            "type": "postParkingCategory",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "uid": "534602bf-1d76-43b0-adcb-c5d932580e05",
                "policycategory": {
                    "uid": null,
                    "name": "name",
                    "description": "desc",
                    "orgid": "null",
                    "siteid": "null",
                    "createdon": null,
                    "lastupdated": null,
                    "isdeleted": null
                }
            }
        }
    }

    return postRequestHandle;
}

function getAllRequestHandle() {
    var getAllRequestHandle = {
        "messageid": "da4067d5-7532-40d1-8763-9f19f02d4f9e",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "responsetopic": "parking.policy.request",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:21.496Z",
            "type": "getAllParkingCategory",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": null
        }
    };
    return getAllRequestHandle;
}

function deleteRequestHandle() {
    var deleteRequestHandle = {
        "messageid": "da4067d5-7532-40d1-8763-9f19f02d4f9e",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "responsetopic": "parking.policy.request",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:25.504Z",
            "type": "deleteParkingCategory",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "uid": "534602bf-1d76-43b0-adcb-c5d932580e05"
            }
        }
    };
    return deleteRequestHandle;
}

function updateRequestHandle() {
    var updateRequestHandle = {
        "messageid": "da4067d5-7532-40d1-8763-9f19f02d4f9e",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "responsetopic": "parking.policy.request",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:23.500Z",
            "type": "updateParkingCategory",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "0be386cc-2cca-4a1c-9a07-0e5a9bc2306c",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "uid": "534602bf-1d76-43b0-adcb-c5d932580e05",
                "policycategory": {
                    "uid": "534602bf-1d76-43b0-adcb-c5d932580e05",
                    "name": "name1",
                    "description": "desc1",
                    "orgid": "d8547b37-95ba-410d-9382-0b190d951332",
                    "siteid": "d8547b37-95ba-410d-9382-0b190d951332",
                    "createdon": 123,
                    "lastupdated": 123,
                    "isdeleted": false
                }
            }
        }
    };
    return updateRequestHandle
}

/**
 * Returns the getRequestHandle for the policy_category 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getResponseHandle() {
    var getResponseHandle = {
        "messageid": "1c6c5c9c-970b-43f9-8b93-fdacc162faeb",
        "response": {
            "requestid": "ed7fbfb8-cbcc-4cbd-87b6-c7bea4008814",
            "timestamp": "2017-07-12T02:24:19.172Z",
            "success": true,
            "result": {
                "uid": "534602bf-1d76-43b0-adcb-c5d932580e05",
                "name": "name",
                "description": "desc",
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332",
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332",
                "createdon": 1499826169162,
                "lastupdated": 1499826169162,
                "isdeleted": false
            }
        }
    };
    return getResponseHandle;
}



function getAllResponseHandle() {
    var getAllResponseHandle = {
        "messageid": "1c6c5c9c-970b-43f9-8b93-fdacc162faeb",
        "response": {
            "requestid": "ed7fbfb8-cbcc-4cbd-87b6-c7bea4008814",
            "timestamp": "2017-07-12T02:24:21.143Z",
            "success": true,
            "result": [
                {
                    "uid": "ab0c4013-4241-4f78-92f5-d8b43245bd87",
                    "name": "name",
                    "description": "desc",
                    "orgid": "d8547b37-95ba-410d-9382-0b190d951332",
                    "siteid": "d8547b37-95ba-410d-9382-0b190d951332",
                    "createdon": 1499826257136,
                    "lastupdated": 1499826257136,
                    "isdeleted": false
                }
            ]
        }
    };
    return getAllResponseHandle;
}

function deleteResponseHandle() {
    var deleteResponseHandle = {
        "messageid": "1c6c5c9c-970b-43f9-8b93-fdacc162faeb",
        "response": {
            "requestid": "ed7fbfb8-cbcc-4cbd-87b6-c7bea4008814",
            "timestamp": "2017-07-12T02:24:25.156Z",
            "success": true,
            "result": {
                "success": true
            }
        }
    };
    return deleteResponseHandle;
}

function errorResponseHandle() {
    var errorResponseHandle = {
        "messageid": "da4067d5-7532-40d1-8763-9f19f02d4f9e",
        "response": {
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:23.505Z",
            "success": false,
            "error": "Policy category not found with that id",
            "status": 500
        }
    };
    return errorResponseHandle
}