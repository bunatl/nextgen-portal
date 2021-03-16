const { searchUserInDb } = require('./dynamodbSearch');

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        getUserName: async (name) => await searchUserInDb(name = 'test')
    }
};