const { gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  schema{ 
    query: Query
  }

  type UserFullInfo{
    username: String
    currentAddress: String
    pernamentAddress: String
    dob: String
    ico: String
    bankAccount: String
    employmentType: String
    annualLeave: String
    notes: String
  }

  input UserFullInfoInput{
    username: String!
    currentAddress: String
    pernamentAddress: String
    dob: String
    ico: String
    bankAccount: String
    employmentType: String
    annualLeave: String
    notes: String
  }

  type Query {
    getUserFullInfo(username: String!): UserFullInfo
  }

  type Mutation{
    updateUserData(userData: UserFullInfoInput!): Boolean!
  }
`;