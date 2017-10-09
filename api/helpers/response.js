'use strict';

module.exports = {
    Done: Done
};

/**
 * Response  based on error and data
 * @param err object Node error JSON object
 * @param data object Data returned as JSON object
 * @param res object Response
 * @param req object Request
 */
function Done(err, data, res, req){
    try{
        if((req && req.timedout) || (res && res.headersSent)) {
            // TODO: Recover from timeout            
        } else if(!err && data) {
            if(data && data.success==true && data.result){
                res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(data.result);
                }
            else if(data && data.success==false){
                res.setHeader('Content-Type', 'application/json');
                var errorResponse = {"error": data.error};
                res.status(data.status).json(errorResponse);
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(data);
            }
        } else if(!err && !data) {
            // Send success with whatever data is returned - empty array is still valid data
            //res.setHeader('Content-Type', 'application/json');
            res.status(204);//.json({});
        } else {            
            res.setHeader('Content-Type', 'application/json');
            var status = err.status;
            if(!status)
                status = (err.message &&
                            (err.message.indexOf('not authorized')!=-1 ||
                             err.message.indexOf('not granted')!=-1 ||
                             err.message.indexOf('ccess denied')!=-1))?403:400; // TODO: You can do it better
            res.status(status).json(err);
        }
        res.end();

    } catch(err){
        console.log('err: '+err);
    }

}