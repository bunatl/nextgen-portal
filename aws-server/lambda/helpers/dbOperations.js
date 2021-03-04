// // Loads in the AWS SDK
const AWS = require('aws-sdk');
// Creates the document client specifing the region (N.Carolina = us-east-1)
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

// Writes message to DynamoDb table employees 
module.exports.addUser = async (username, psswd, mail) => {
    const params = {
        TableName: 'Employees',
        Item: {
            'username': username,
            'email': mail,
            'password': psswd
        }
    };
    return ddb.put(params).promise();
};

// Searches users in DynamoDb table employees 
module.exports.searchUser = async username => {
    const params = {
        TableName: 'Employees',
        Key: {
            'username': username
        }
    };
    return ddb.get(params).promise();
};

