const {
    searchUser,
    addUser
} = require('./dbOperations');

exports.handler = async (event) => {
    if (!event.username || !event.psswd || !event.email)
        return response(200, "Incorrect parameters.");

    // body params
    const username = event.username;
    const psswd = event.psswd;
    const email = event.email;
    console.log("params", username, psswd, email);

    try {
        // check if users exists
        const resSearch = await searchUser(username);
        if (resSearch.Item !== undefined)
            return response(200, `User with username ${ username } already exists.`);
        console.log("continue");
        // insert user
        await addUser(username, psswd, email);
        // check if added succesfully
        const resSearch2 = await searchUser(username);
        return resSearch2.Item === undefined
            ? response(200, "User couldn't be registered. Please try again.")
            : response(201, `User with username ${ username } has been succesfully created.`);
    } catch (err) {
        return response(200, err);
    }
};

const response = (code, data) => {
    console.log(code, " ", data);
    return {
        statusCode: code,
        body: JSON.stringify(data)
    };
};