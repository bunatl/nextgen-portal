import {
    scanDb,
    putDataToDb,
    searchUserInDb
} from './dynamodbOperations';

import { IUser, IAllUser } from '../types'

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        // function signuture -> https://www.apollographql.com/docs/tutorial/resolvers/#the-resolver-function-signature
        getUserFullInfo: async (_, data) => {
            const user: IUser | null = await searchUserInDb(data.username);
            return user
                ? {
                    username: user.username ? user.username : '',
                    name: user.name ? user.name : '',
                    currentAddress: user.currentAddress ? user.currentAddress : '',
                    pernamentAddress: user.pernamentAddress ? user.pernamentAddress : '',
                    dob: user.dob ? user.dob : '',
                    startDate: user.startDate ? user.startDate : '',
                    ico: user.ico ? user.ico : '',
                    bankAccount: user.bankAccount ? user.bankAccount : '',
                    compensation: user.compensation ? user.compensation : '',
                    employmentType: user.employmentType ? user.employmentType : '',
                    annualLeave: user.annualLeave ? user.annualLeave : '',
                    notes: user.notes ? user.notes : '',
                }
                : ''
        },
        getAllUsers: async () => {
            const users: IAllUser[] | null = await scanDb();
            return users
                ? users.reduce((acc: IAllUser[], current) => {
                    acc.push({
                        username: current.username ? current.username : '',
                        name: current.name ? current.name : ''
                    });
                    return acc;
                }, [])
                : []
        }
    },
    Mutation: {
        updateUserData: async (_, data): Promise<boolean> => await putDataToDb(data.userData)
    },
};