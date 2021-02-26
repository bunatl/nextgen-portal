const { searchUser } = require('./dbOperations');

exports.handler = async (event) => {
    if (!event.username || !event.psswd)
        return response(200, "Incorrect parameters.");

    // body params
    const username = event.username;
    const psswd = event.psswd;
    console.log("params", username, psswd);

    try {
        // check if users exists
        const resSearch = await searchUser(username);
        if (resSearch.Item === undefined)
            return response(200, `User with username ${ username } doesn't exists.`);

        return (username === resSearch.Item.username && psswd === resSearch.Item.password)
            ? response(200, `Successfull login.`)
            : response(200, `Username or password does not match.`);
    } catch (err) {
        console.log("err", err);
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