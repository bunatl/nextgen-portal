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
        console.log(username);
        const data = await ddb.get(params).promise();
        return data.Item;
    } catch (err) {
        return '';
    }
};

exports.putDataToDb = async userData => {
    const params = {
        TableName: 'Employees',
        Item: {
            username: userData.username,
            currentAddress: userData.currentAddress,
            pernamentAddress: userData.pernamentAddress,
            dob: userData.dob,
            ico: userData.ico,
            bankAccount: userData.bankAccount,
            employmentType: userData.employmentType,
            annualLeave: userData.annualLeave,
            notes: userData.notes
        }
    };

    try {
        const data = await ddb.put(params).promise();
        return true;
    } catch (err) {
        console.log("Error while writing to DB.", err);
        return false;
    }
};
