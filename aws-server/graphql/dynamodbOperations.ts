import { IUser } from '../types'
// // Loads in the AWS SDK
const AWS = require('aws-sdk');
// Creates the document client specifing the region (N.Carolina = us-east-1)
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });

// PromiseResult<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>
export const searchUserInDb = async (username: string): Promise<IUser | null> => {
    const params = {
        TableName: 'Employees',
        Key: {
            username
        }
    };

    try {
        const data = await ddb.get(params).promise();
        return data.Item;
    } catch (err) {
        console.log("Error while searching DB by username.", err);
        return null;
    }
};

export const putDataToDb = async (userData: IUser): Promise<boolean> => {
    const params = {
        TableName: 'Employees',
        Item: {
            username: userData.username,
            name: userData.name,
            currentAddress: userData.currentAddress,
            pernamentAddress: userData.pernamentAddress,
            dob: userData.dob,
            startDate: userData.startDate,
            ico: userData.ico,
            bankAccount: userData.bankAccount,
            compensation: userData.compensation,
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

export const scanDb = async (): Promise<IUser[] | null> => {
    const params = {
        TableName: 'Employees',
    };

    try {
        const data = await ddb.scan(params).promise();
        return data.Items;
    } catch (err) {
        console.log("Error while scanning DB.", err);
        return null;
    }
};
