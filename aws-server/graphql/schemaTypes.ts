import { gql } from 'apollo-server-lambda';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  schema{ 
    query: Query
    mutation: Mutation
  }

  type UserFullInfo{
    username: String
    name: String
    currentAddress: String
    pernamentAddress: String
    dob: String
    startDate: String
    ico: String
    bankAccount: String
    compensation: String
    employmentType: String
    annualLeave: String
    notes: String
  }

  type AutocompleteUserInfo{
    username: String!
    name: String!
  }

  input UserFullInfoInput{
    username: String!
    name: String
    currentAddress: String
    pernamentAddress: String
    dob: String
    startDate: String
    ico: String
    bankAccount: String
    compensation: String
    employmentType: String
    annualLeave: String
    notes: String
  }

  type Query {
    getUserFullInfo(username: String!): UserFullInfo
    getAllUsers: [AutocompleteUserInfo]!
  }

  type Mutation{
    updateUserData(userData: UserFullInfoInput!): Boolean!
  }
`;