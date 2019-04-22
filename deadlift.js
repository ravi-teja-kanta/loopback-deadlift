const request = require("request");

module.exports = function(loopbackConfig) {
    let {
        backendUrl, 
        authenticationToken
    } = loopbackConfig;
    
    function getInstances(modelName, filter, callback) {
        request.get(
            getAppropriateUrl(modelName, filter),
            buildRequestBody(),
            requestCallback(callback)   
        );
    }
    
    function addInstance (modelName, newData, callback) {
        request.post(
            getAppropriateUrl(modelName),
            buildRequestBody(newData),
            requestCallback(callback)
        );
    }
    
    function updateInstance(modelName, updateData, callback) {
        request.put(
            getAppropriateUrl(modelName),
            buildRequestBody(updateData),
            requestCallback(callback)
        );
    }
    
    function callRemoteMethod(modelName, remoteMethodName, argumentsToRemoteMethod, httpMethod, callback) {
        // TODO: Handle other httpMethods and corner cases.
        if (httpMethod === "POST") {
            request.post(
                getUrlWithRemoteMethod(modelName, remoteMethodName),
                buildRequestBody(argumentsToRemoteMethod),
                requestCallback(callback)
            );
        }
        else {
            callback(`httpMethod: ${httpMethod} not supported as of now`);
        }
    }
    
    function deleteInstanceById(modelName, id, callback) {
        request.delete(
            getUrlWithId(modelName, id),
            buildRequestBody(),
            requestCallback(callback)
        );
    }
    
    function getUrlWithId(modelName, id) {
        return `${backendUrl}/${modelName}s/${id}`;
    }
    
    function getUrlWithRemoteMethod(modelName, remoteMethodName) {
        return `${backendUrl}/${modelName}s/${remoteMethodName}`;
    }
    
    function getAppropriateUrl(modelName, filter) {
        return `${backendUrl}/${modelName}s${handleFilterObject(filter)}`;
    }
    
    function addWhereToFilter(filter){
        return {
            "where": filter
        };
    }
    
    
    function handleFilterObject(filter) {
        return filter ? `?filter=${JSON.stringify(addWhereToFilter(filter))}`: "/"; 
    }
    
    function buildRequestBody(postData) {
        let body = {
            json: true,
            "body": postData || {},
            "headers": {
                "authorization": authenticationToken 
            }
        }
        return body;
    }
    
    function requestCallback(callback) {
        return function (err, response, body) {
            if (err || response.statusCode !== 200) {
                callback(err || body);
            } else {
                callback(null, body);
            }
        }
    }

    return {
        getInstances,
        addInstance,
        updateInstance,
        deleteInstanceById,
        callRemoteMethod
    };
}
