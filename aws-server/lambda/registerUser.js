const {
    searchUser,
    addUser
} = require('./dbOperations');

exports.handler = async (event) => {
    // if (!event.username || !event.psswd || !event.email)
    //     return response(404, "Incorrect parameters.");

    // body params
    const username = event.username;
    const psswd = event.psswd;
    const email = event.email;

    console.log("params", username, psswd, email);

    try {
        // check if users exists
        const resSearch = await searchUser(username);
        console.log(resSearch);
        // insert user
        const resAdd = await addUser(username, psswd, email);
        console.log(resAdd);
        return response(200, "OK");
    } catch (err) {
        return response(404, err);
    }
};

const response = (code, data) => {
    return {
        statusCode: code,
        body: data
    };
};