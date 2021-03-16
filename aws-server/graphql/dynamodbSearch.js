// // Loads in the AWS SDK
const AWS = require('aws-sdk');
// Creates the document client specifing the region (N.Carolina = us-east-1)
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

exports.searchUserInDb = async username => {
    const params = {
        TableName: 'Employees',
        Key: {
            'username': username
        }
    };

    try {
        const data = await ddb.get(params).promise();
        return data.Item.name;
    } catch (err) {
        return '';
    }
};
