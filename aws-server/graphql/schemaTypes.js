const { gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  type Query {
    getUserName(name: String): String
  }
`;