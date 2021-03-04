module.exports.response = (code, data, success) => {
    return {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            "Access-Control-Allow-Methods": "ANY"
        },
        body: JSON.stringify({
            data,
            success
        })
    };
};