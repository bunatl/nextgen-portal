import {
    getUserFullInfoQuery,
    getGetAllUsersQuery,
    getUpdateUserDataMutation
} from '../graphql/queries';

export const fetchUserFullInfo = async (username: string): Promise<any> => {
    try {
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: getUserFullInfoQuery(username)
            })
        })
        return await res.json();
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export const fetchAllUsers = async (): Promise<any> => {
    try {
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: getGetAllUsersQuery()
            })
        })
        return await res.json();
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export const putUpdateUserData = async (formData: any): Promise<any> => {
    try {
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                query: getUpdateUserDataMutation(formData)
            })
        })
        return await res.json();
    } catch (err) {
        console.error(err);
        return undefined;
    }
}