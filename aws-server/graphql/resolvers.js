const { searchUserInDb } = require('./dynamodbOperations');
const { putDataToDb } = require('./dynamodbOperations');
const { scanDb } = require('./dynamodbOperations');

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        // function signuture -> https://www.apollographql.com/docs/tutorial/resolvers/#the-resolver-function-signature
        getUserFullInfo: async (_, data) => {
            const user = await searchUserInDb(data.username);
            return {
                username: user.username,
                name: user.name,
                currentAddress: user.currentAddress,
                pernamentAddress: user.pernamentAddress,
                dob: user.dob,
                startDate: user.startDate,
                ico: user.ico,
                bankAccount: user.bankAccount,
                compensation: user.compensation,
                employmentType: user.employmentType,
                annualLeave: user.annualLeave,
                notes: user.notes
            };
        },
        getAllUsers: async () => {
            const users = await scanDb();
            return users.reduce((acc, current) => {
                acc.push({
                    username: current.username ? current.username : '',
                    name: current.name ? current.name : ''
                });
                return acc;
            }, []);
        }
    },
    Mutation: {
        updateUserData: async (_, data) => await putDataToDb(data.userData)
    },
};