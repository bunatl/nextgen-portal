// const { searchUser } = require('./dbOperations');
// Loads in the AWS SDK
const AWS = require('aws-sdk');
// Creates the document client specifing the region (N.Carolina = us-east-1)
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

// Writes message to DynamoDb table employees 
const searchUser = username => {
    const params = {
        TableName: 'Employees',
        Key: {
            'username': username
        }
    };
    return ddb.get(params).promise();
};


const response = (code, data, success) => {
    return {
        'statusCode': code,
        'body': JSON.stringify(data),
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            "Access-Control-Allow-Methods": "ANY"
        },
        'success': success
    };
};

module.exports.login = async (event) => {
    // if (!event.username || !event.psswd)
    //     return response(200, "Incorrect parameters.", false);

    // body params
    // const username = event.username;
    // const psswd = event.psswd;
    const username = 'aa';
    const psswd = 'x';

    try {
        // check if users exists
        const resSearch = await searchUser(username);
        if (resSearch.Item === undefined)
            return response(200, `User with username ${ username } doesn't exists.`, false);

        return (username === resSearch.Item.username && psswd === resSearch.Item.password)
            ? response(200, `Successfull login.`, true)
            : response(200, `Username or password does not match.`, false);
    } catch (err) {
        return response(err.statusCode, err, false);
    }
};
