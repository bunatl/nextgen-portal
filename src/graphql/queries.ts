import { gql } from '@apollo/client';

export const ALL_USERS_QUERY = gql`
    query{
        getAllUsers{
            username
            name
        }
    }
`;

export const GET_USER_FULL_INFO = gql`
    query($username: String!){
        getUserFullInfo(username: $username){
            username
            name
            currentAddress
            pernamentAddress
            dob
            startDate
            ico
            bankAccount
            compensation
            employmentType
            annualLeave
            notes
        }
    }
`;

export const UPDATE_USER_DATA = gql`
        mutation($userData: UserFullInfoInput!) {
            updateUserData(userData: $userData)
    }
`;

export const GET_USER_INFO = gql`
    query($username: String!){
        getUserFullInfo(username: $username){
            username
            name
            currentAddress
            pernamentAddress
            dob
            startDate
            notes
        }
    }
`;

export const GET_VACATION_INFO = gql`
    query($username: String!){
        getUserFullInfo(username: $username){
            annualLeave
        }
    }
`;

export const GET_FINANCIAL_INFO = gql`
    query($username: String!){
        getUserFullInfo(username: $username){
            ico
            bankAccount
            compensation
            employmentType
        }
    }
`;