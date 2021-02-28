const {
    searchUser,
    addUser
} = require('./dbOperations');

exports.handler = async (event) => {
    if (!event.username || !event.psswd || !event.email)
        return response(200, "Incorrect parameters.", false);

    // body params
    const username = event.username;
    const psswd = event.psswd;
    const email = event.email;

    try {
        // check if users exists
        const resSearch = await searchUser(username);
        if (resSearch.Item !== undefined)
            return response(200, `User with username ${ username } already exists.`, false);
        // insert user
        await addUser(username, psswd, email);
        // check if added succesfully
        const resSearch2 = await searchUser(username);
        return resSearch2.Item === undefined
            ? response(200, "User couldn't be registered. Please try again.", false)
            : response(200, `User with username ${ username } has been succesfully created.`, true);
    } catch (err) {
        return response(200, err, false);
    }
};

const response = (code, data, registered) => {
    return {
        statusCode: code,
        body: JSON.stringify(data),
        registered
    };
};