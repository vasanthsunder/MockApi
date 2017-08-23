'use strict';
module.exports = {
    createMetadataForParkingSpotRequestHandle: createMetadataForParkingSpotRequestHandle,
    getAllMetadataForParkingSpotRequestHandle: getAllMetadataForParkingSpotRequestHandle,
    updateMetadataForParkingSpotRequestHandle: updateMetadataForParkingSpotRequestHandle,
    getMetadataForParkingSpotRequestHandle: getMetadataForParkingSpotRequestHandle,
    deleteMetadataForParkingSpotRequestHandle: deleteMetadataForParkingSpotRequestHandle
};

/**
 * Returns the createMetadataForParkingSpotRequestHandle for the parking spot  
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function createMetadataForParkingSpotRequestHandle() {
    var createMetadataForParkingSpotRequestHandle = {
        "messageid": "8f4dcc93-1769-4e8d-8f61-b9a4347af04c",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "7b44d204-5e29-405c-9ec9-6b9f45f9feca",
            "requestid": "ba7b1e29-761b-45d9-bd10-67b18537dddd",
            "timestamp": "2017-08-08T20:03:07.154Z",
            "type": "createMetadataForParkingSpot",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "a35d5743-35d2-415e-a7a5-e06eadb0f5de",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "parkingSpot": {
                    "uid": "newparkingspot",
                    "name": "Parking spot change",
                    "reservation": true,
                    "handicap": true,
                    "demarcated": true,
                    "geoCoordinates": {
                        "upperLeftCorner": {
                            "latitude": 13.237,
                            "longitude": -43.237
                        },
                        "upperRightCorner": {
                            "latitude": 247.237,
                            "longitude": 43.237
                        },
                        "lowerLeftCorner": {
                            "latitude": 137.2377,
                            "longitude": -63.237
                        },
                        "lowerRightCorner": {
                            "latitude": 247.237,
                            "longitude": -63.237
                        }
                    },
                    "formFactor": "c",
                    "monitoringSensorid": "c",
                    "businessUse": "c",
                    "parkinggroupid": "c",
                    "typeOfVehicle": [
                        "c"
                    ],
                    "howMetered": "c",
                    "unDemarcatedNumSpots": 37,
                    "active": "c",
                    "PPV": true,
                    "areaType": [
                        "CBDc"
                    ],
                    "paystationid": "c",
                    "currentStatus": 57
                }
            }
        }
    };
    return createMetadataForParkingSpotRequestHandle;
}

/**
 * Returns the getAllMetadataForParkingSpotRequestHandle for the parking spot
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getAllMetadataForParkingSpotRequestHandle() {
    var getAllMetadataForParkingSpotRequestHandle = {
        "messageid": "ee647269-e302-477f-8963-8aa0317f9cd3",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "ff4083b0-9648-4a4c-a089-3128a5a29a2b",
            "requestid": "711a588b-5f57-4aec-88bf-46f7fa8a997f",
            "timestamp": "2017-08-08T20:20:45.191Z",
            "type": "getAllMetadataForParkingSpot",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "e25e0c39-69ab-401d-ad01-2e5257eb2164",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            }
        }
    };
    return getAllMetadataForParkingSpotRequestHandle;
}

/**
 * Returns the updateMetadataForParkingSpotRequestHandle for the parking spot
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function updateMetadataForParkingSpotRequestHandle() {
    var updateMetadataForParkingSpotRequestHandle = {
        "messageid": "9bbb5dde-6007-4057-b60f-efc6936d82ed",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "d91ede3e-52ad-4819-b8bb-e6813fdcc5d9",
            "requestid": "f52b785d-356c-48e0-88d5-275d2c978230",
            "timestamp": "2017-08-08T21:24:44.654Z",
            "type": "updateMetadataForParkingSpot",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "4afd4524-9dd7-4143-a2f1-80c73caa6739",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "parkingspotid": "4134f299-2450-4f2c-a2d6-03618345b8d10",
                "parkingSpot": {
                    "uid": "newparkingspot",
                    "name": "Parking spot change",
                    "reservation": true,
                    "handicap": true,
                    "demarcated": true,
                    "geoCoordinates": {
                        "upperLeftCorner": {
                            "latitude": 13.237,
                            "longitude": -43.237
                        },
                        "upperRightCorner": {
                            "latitude": 247.237,
                            "longitude": 43.237
                        },
                        "lowerLeftCorner": {
                            "latitude": 137.2377,
                            "longitude": -63.237
                        },
                        "lowerRightCorner": {
                            "latitude": 247.237,
                            "longitude": -63.237
                        }
                    },
                    "formFactor": "c",
                    "monitoringSensorid": "c",
                    "businessUse": "c",
                    "parkinggroupid": "c",
                    "typeOfVehicle": [
                        "c"
                    ],
                    "howMetered": "c",
                    "unDemarcatedNumSpots": 37,
                    "active": "c",
                    "PPV": true,
                    "areaType": [
                        "CBDc"
                    ],
                    "paystationid": "c",
                    "currentStatus": 57
                }
            }
        }
    };
    return updateMetadataForParkingSpotRequestHandle;
}

/**
 * Returns the getMetadataForParkingSpotRequestHandle for the parking spot
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getMetadataForParkingSpotRequestHandle() {
    var getMetadataForParkingSpotRequestHandle = {
        "messageid": "af55c97a-8fe3-4c19-82d9-bc6a13fff89c",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "34214a16-858e-4b4f-b87e-226f0eac1f12",
            "requestid": "6d09d757-b447-47cd-b4bb-c82844ec6fe9",
            "timestamp": "2017-08-08T19:56:42.857Z",
            "type": "getMetadataForParkingSpot",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "86057349-273d-4fda-9067-3429927ec61e",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "parkingspotid": "51c34f299-2450-4f2c-a2d6-03618345b810",
            }
        }
    };
    return getMetadataForParkingSpotRequestHandle;
}

/**
 * Returns the deleteMetadataForParkingSpotRequestHandle for the parking spot
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function deleteMetadataForParkingSpotRequestHandle() {
    var deleteMetadataForParkingSpotRequestHandle = {
        "messageid": "2b6b14a9-0c08-4b03-86ac-2ff13e6f66d6",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "d12296e0-bb43-4d54-86fc-889bdbb03e83",
            "requestid": "3ba7f7f9-2e89-4423-84a2-ac3f07f45f9f",
            "timestamp": "2017-08-08T20:26:38.205Z",
            "type": "deleteMetadataForParkingSpot",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "d5d2e36d-e14e-4e3a-bd8c-a5e005e4ecfe",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "parkingspotid": "51c34f299-2450-4f2c-a2d6-03618345b810",
            }
        }
    };
    return deleteMetadataForParkingSpotRequestHandle;
}
