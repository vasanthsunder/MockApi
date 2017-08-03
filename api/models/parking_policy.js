'use strict';
module.exports = {
    getRequestHandle: getRequestHandle,
    postRequestHandle: postRequestHandle,
    getAllRequestHandle: getAllRequestHandle,
    deleteRequestHandle: deleteRequestHandle,
    updateRequestHandle: updateRequestHandle,
    getRequestHandleByVersion: getRequestHandleByVersion,
    getRequestHandleByVersionHistory: getRequestHandleByVersionHistory,
    getRequestHandleByTimeline: getRequestHandleByTimeline,
    getActivePolicyRequestHandle: getActivePolicyRequestHandle,
    postSearchPolicyRequestHandle: postSearchPolicyRequestHandle

};

/**
 * Returns the getRequestHandle for the policy_category 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function getRequestHandle() {
    var getRequestHandle = {
        "messageid": "ac9c59f9-eaf0-4a63-9a84-b945877b519a",
        "request": {
            "instanceid": "5a65ddc0-33a7-48f7-8626-3d62e6369290",
            "responsetopic": "parking.policy.request",
            "requestid": "f18cc2be-dfec-48e1-8741-814ca183f719",
            "timestamp": "2017-07-20T19:50:28.866Z",
            "type": "getParkingPolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "4d5b95ce-5c5b-4dad-b7bd-7aca5667874d",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "policyid": "27fa445a-ad9c-4f5d-bbb5-cfd99bc579cb"
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
        "messageid": "c9ea1a49-6076-441e-b0cc-fc4cd87a6ed5",
        "request": {
            "instanceid": "6e78a195-0545-4e84-ba91-21b1006d1874",
            "responsetopic": "parking.policy.request",
            "requestid": "72978964-4f9d-4f99-94a5-381290bcbfb1",
            "timestamp": "2017-07-20T20:04:30.117Z",
            "type": "postParkingPolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "ad0bc363-26a5-474b-a575-ea3b5bcebb03",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "policy": {
                    "uid": null,
                    "policyAuthorizerid": "d8547b37-95ba-410d-9382-0b190d951332",
                    "category": [
                        "new Category",
                        "Category2"
                    ],
                    "name": "ters policy",
                    "timeZone": "Africa/Costarica",
                    "policyRule": [
                        {
                            "name": "Policy rule",
                            "description": "Policy rule Description",
                            "priority": 12,
                            "parkingSchedule": {
                                "description": "Schedule",
                                "daysOfWeek": [

                                ],
                                "months": [

                                ],
                                "datePeriod": {
                                    "period": {
                                        "startDateTime": "2017-06-28T19:31:03Z",
                                        "endDateTime": "2018-06-28T19:31:03Z"
                                    },
                                    "occurs": "yearly"
                                },
                                "timeRange": [
                                    {
                                        "startTime": "06:00:00",
                                        "endTime": "11:00:00"
                                    }
                                ]
                            },
                            "parkingRule": {
                                "description": "Rule",
                                "parkingAllowed": true,
                                "parkingCharge": {
                                    "description": "Charge Description",
                                    "chargeDuration": [

                                    ],
                                    "maxDuration": {
                                        "duration": 24.0,
                                        "units": "hours"
                                    },
                                    "maxCharge": 60.4
                                },
                                "parkingPenalty": {
                                    "description": "Penalty description",
                                    "violationFine": [
                                        {
                                            "violationType": "maxTimeExceed",
                                            "violationFee": 100.0
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
    return postRequestHandle;
}

function getAllRequestHandle() {
    var getAllRequestHandle = {
        "messageid": "fa529b44-3ddb-4115-a6fc-75c5774cece1",
        "request": {
            "instanceid": "e409bcdf-4855-4303-9b1b-a013880da32c",
            "responsetopic": "parking.policy.request",
            "requestid": "9324e10e-68a7-49cf-8f4a-4d8fc5661c8b",
            "timestamp": "2017-07-20T20:18:52.562Z",
            "type": "getAllParkingPolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "e46aa53c-f678-404b-a069-2fac95f02460",
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
        "messageid": "4563ff61-aa91-4955-9da0-93e5ae4f0cb1",
        "request": {
            "instanceid": "64e260e2-af09-4e28-a1c9-bddf947213bc",
            "responsetopic": "parking.policy.request",
            "requestid": "000f215a-ace2-4684-8c42-fa8a1e5efc61",
            "timestamp": "2017-07-20T20:26:31.783Z",
            "type": "deleteParkingPolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "6b4f4f0c-95e9-4e5d-a258-f460985dfde6",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "policyid": "27fa445a-ad9c-4f5d-bbb5-cfd99bc579cb"
            }
        }
    };
    return deleteRequestHandle;
}

function updateRequestHandle() {
    var updateRequestHandle = {
        "messageid": "c90b90bc-1a14-476a-8fcc-a3f103bde17b",
        "request": {
            "instanceid": "fba3bd95-f50c-4865-b3b4-94bac0d1f657",
            "responsetopic": "parking.policy.request",
            "requestid": "95101c0f-232b-45b6-864d-3c95c2c74cf8",
            "timestamp": "2017-07-20T20:29:26.169Z",
            "type": "updateParkingPolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "1ccaf490-4da2-4d49-bf11-bd7d63aa845f",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "policyid": "e9fd320a-0cda-4d0e-9272-5f78dfc24691",
                "policy": {
                    "uid": null,
                    "policyAuthorizerid": "d8547b37-95ba-410d-9382-0b190d951332",
                    "category": [
                        "new Category",
                        "Category2"
                    ],
                    "name": "ters policy",
                    "timeZone": "Africa/Costarica",
                    "policyRule": [
                        {
                            "name": "Policy rule",
                            "description": "Policy rule Description",
                            "priority": 12,
                            "parkingSchedule": {
                                "description": "Schedule",
                                "daysOfWeek": [

                                ],
                                "months": [

                                ],
                                "datePeriod": {
                                    "period": {
                                        "startDateTime": "2017-06-28T19:31:03Z",
                                        "endDateTime": "2018-06-28T19:31:03Z"
                                    },
                                    "occurs": "yearly"
                                },
                                "timeRange": [
                                    {
                                        "startTime": "06:00:00",
                                        "endTime": "11:00:00"
                                    }
                                ]
                            },
                            "parkingRule": {
                                "description": "Rule",
                                "parkingAllowed": true,
                                "parkingCharge": {
                                    "description": "Charge Description",
                                    "chargeDuration": [

                                    ],
                                    "maxDuration": {
                                        "duration": 24.0,
                                        "units": "hours"
                                    },
                                    "maxCharge": 60.4
                                },
                                "parkingPenalty": {
                                    "description": "Penalty description",
                                    "violationFine": [
                                        {
                                            "violationType": "maxTimeExceed",
                                            "violationFee": 100.0
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }
    };
    return updateRequestHandle
}

function getRequestHandleByVersion() {
    var getRequestHandleByVersion = {
        "messageid": "bacb8f21-8838-47e5-a0ae-ecf9985756b7",
        "request": {
            "instanceid": "7baafe3a-51a3-43d5-ab26-b9651bfc0547",
            "responsetopic": "parking.policy.request",
            "requestid": "18189915-b785-4dff-be59-df6af992f3ab",
            "timestamp": "2017-08-01T16:44:17.596Z",
            "type": "getPolicyByVersionNumber",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "f4b15f3c-4163-4e7b-a59b-4c2fda485e90",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "policyid": "20b399bd-b146-49a8-a618-3409bc17ada1",
                "version": 6
            }
        }
    };
    return getRequestHandleByVersion
}

function getRequestHandleByVersionHistory() {
    var getRequestHandleByVersionHistory = {
        "messageid": "2c2d0e94-746e-4fef-a8ad-dca8426b0b79",
        "request": {
            "instanceid": "ce3676c0-c402-4ed9-90d2-d6447689ecc4",
            "responsetopic": "parking.policy.request",
            "requestid": "97b8aaf0-d24e-4ee4-9174-3b2a549c19bb",
            "timestamp": "2017-08-01T16:50:30.468Z",
            "type": "getPolicyVersionHistory",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "76ac05cb-3629-479f-8cfc-36ce13fbf6a7",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "policyid": "8c191a7b-e82c-48ba-869e-f48e3caece00"
            }
        }
    };
    return getRequestHandleByVersionHistory
}

function getRequestHandleByTimeline() {
    var getRequestHandleByTimeline = {
        "messageid": "2c2d0e94-746e-4fef-a8ad-dca8426b0b79",
        "request": {
            "instanceid": "ce3676c0-c402-4ed9-90d2-d6447689ecc4",
            "responsetopic": "parking.policy.request",
            "requestid": "97b8aaf0-d24e-4ee4-9174-3b2a549c19bb",
            "timestamp": "2017-08-01T16:50:30.468Z",
            "type": "getActivePoliciesWithInTimeline",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "76ac05cb-3629-479f-8cfc-36ce13fbf6a7",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "parkinggroupid": "8c191a7b-e82c-48ba-869e-f48e3caece00",
                "fromtime": "12413413",
                "totime": "214134134"
            }
        }
    };
    return getRequestHandleByTimeline
}

function getActivePolicyRequestHandle() {
    var getActivePolicyRequestHandle = {
        "messageid": "2c2d0e94-746e-4fef-a8ad-dca8426b0b79",
        "request": {
            "instanceid": "ce3676c0-c402-4ed9-90d2-d6447689ecc4",
            "responsetopic": "parking.policy.request",
            "requestid": "97b8aaf0-d24e-4ee4-9174-3b2a549c19bb",
            "timestamp": "2017-08-01T16:50:30.468Z",
            "type": "getActivePolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "76ac05cb-3629-479f-8cfc-36ce13fbf6a7",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "parkinggroupid": "8c191a7b-e82c-48ba-869e-f48e3caece00"
            }
        }
    };
    return getActivePolicyRequestHandle
}

function postSearchPolicyRequestHandle() {
    var postSearchPolicyRequestHandle = {
        "messageid": "2c2d0e94-746e-4fef-a8ad-dca8426b0b79",
        "request": {
            "instanceid": "ce3676c0-c402-4ed9-90d2-d6447689ecc4",
            "responsetopic": "parking.policy.request",
            "requestid": "97b8aaf0-d24e-4ee4-9174-3b2a549c19bb",
            "timestamp": "2017-08-01T16:50:30.468Z",
            "type": "postToSearchPolicy",
            "model": "getSensorHistoryFromTo",
            "action": "CAN_READ",
            "user": "76ac05cb-3629-479f-8cfc-36ce13fbf6a7",
            "orgprops": {
                "orgid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "siteprops": {
                "siteid": "d8547b37-95ba-410d-9382-0b190d951332"
            },
            "configprops": {
                "searchPayload": {
                    "name": "string",
                    "tagid": "string"
                }
            }
        }
    };
    return postSearchPolicyRequestHandle
}