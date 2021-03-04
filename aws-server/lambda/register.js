const { searchUser, addUser } = require('./helpers/dbOperations');
const { response } = require('./helpers/response');

module.exports.register = async (event, context, callback) => {
    // body params
    const { username, psswd, email } = JSON.parse(event.body);

    if (!username || !psswd || !email ||
        username.trim() === '' || psswd.trim() === '' || email.trim() === '')
        callback(null, response(200, "Incorrect parameters.", false));

    try {
        // check if users exists
        const resSearch = await searchUser(username);
        if (resSearch.Item !== undefined)
            callback(null, response(200, `User with username ${ username } already exists.`, false));
        // insert user
        await addUser(username, psswd, email);
        // check if added succesfully
        const resSearch2 = await searchUser(username);
        callback(null, resSearch2.Item === undefined
            ? response(200, "User couldn't be registered. Please try again.", false)
            : response(200, `User with username ${ username } has been succesfully created.`, true));
    } catch (err) {
        callback(null, response(err.statusCode, err, false));
    }
};
