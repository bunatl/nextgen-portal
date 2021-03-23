const { searchUserInDb } = require('./dynamodbOperations');
const { putDataToDb } = require('./dynamodbOperations');

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        // function signuture -> https://www.apollographql.com/docs/tutorial/resolvers/#the-resolver-function-signature
        getUserFullInfo: async (_, data) => {
            const user = await searchUserInDb(data.username);
            return {
                username: user.username,
                currentAddress: user.currentAddress,
                pernamentAddress: user.pernamentAddress,
                dob: user.dob,
                ico: user.ico,
                bankAccount: user.bankAccount,
                employmentType: user.employmentType,
                annualLeave: user.annualLeave,
                notes: user.notes
            };
        }
    },
    Mutation: {
        updateUserData: async (_, data) => await putDataToDb(data.userData)
    },
};