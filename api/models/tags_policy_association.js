'use strict';
module.exports = {
    postTagsAssociateRequestHandle: postTagsAssociateRequestHandle,
    postTagsDisassociateRequestHandle: postTagsDisassociateRequestHandle,
    };

/**
 * Returns the postTagsAssociateRequestHandle for the tag policy 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function postTagsAssociateRequestHandle() {
    var postTagsAssociateRequestHandle = {
        "messageid": "da4067d5-7532-40d1-8763-9f19f02d4f9e",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:25.504Z",
            "type": "policyTagsAssociation",
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
                "policyid": "string",
                "tagspolicylink": {
                    "tagids": [
                        "new Category",
                        "Category2"
                    ]
                }
            }
        }
    };
    return postTagsAssociateRequestHandle;
}

/**
 * Returns the postTagsDisassociateRequestHandle for the tag policy 
 * intialise them with some dummy values
 * These can be overidden with in each specific request
 */
function postTagsDisassociateRequestHandle() {
    var postTagsDisassociateRequestHandle = {
        "messageid": "da4067d5-7532-40d1-8763-9f19f02d4f9e",
        "responsetopic": "api.reply.interface",
        "request": {
            "instanceid": "75b3e303-ec4f-4643-b483-f98d975a5d24",
            "requestid": "291ef868-2bd0-4350-ac87-3591039bb397",
            "timestamp": "2017-07-12T02:33:25.504Z",
            "type": "policyTagsDisassociation",
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
                "policyid": "string",
                "tagspolicylink": {
                    "tagids": [
                        "new Category",
                        "Category2"
                    ]
                }
            }
        }
    };
    return postTagsDisassociateRequestHandle;
}

