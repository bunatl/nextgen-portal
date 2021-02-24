// Loads in the AWS SDK
const AWS = require('aws-sdk');
// Creates the document client specifing the region (N.Carolina = us-east-1)
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Writes message to DynamoDb table employees 
export const addUser = async (userID, mail, psswd) => {
    const params = {
        TableName: 'employees',
        Item: {
            'messageId': userID,
            'email': mail,
            'password': psswd
        }
    };
    return ddb.put(params).promise();
};

// Writes message to DynamoDb table employees 
export const searchUser = (userID) => {
    const params = {
        TableName: 'Table',
        Key: {
            HashKey: userID
        }
    };
    return ddb.get(params).promise();
};

