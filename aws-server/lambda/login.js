const { searchUser } = require('./helpers/dbOperations');
const { response } = require('./helpers/response');

module.exports.login = async (event, context, callback) => {
    // body params
    const { username, psswd } = JSON.parse(event.body);

    if (!username || !psswd ||
        username.trim() === '' || psswd.trim() === '')
        callback(null, response(200, "Incorrect parameters.", false));

    try {
        // check if users existsdd
        const resSearch = await searchUser(username);
        if (resSearch.Item === undefined)
            callback(null, response(200, `User with username ${ username } doesn't exists.`, false));

        callback(null, (username === resSearch.Item.username && psswd === resSearch.Item.password)
            ? response(200, `Successfull login.`, true)
            : response(200, `Username or password does not match.`, false));
    } catch (err) {
        callback(null, response(err.statusCode, err, false));
    }
};
