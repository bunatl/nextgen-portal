import {
    searchUser,
    addUser
} from './dbOperations';

exports.handler = async (event, context, callback) => {
    // Captures the requestId from the context message
    // const requestId = context.awsRequestId;
    console.log(event);
    console.log(context);
    console.log(callback);

    try {
        // search
        // true leave fail add new one
        const data = await searchUser('name');
        console.log(data);
        // Handle promise fulfilled/rejected states
        // callback(null, {
        //     statusCode: 201,
        //     body: '',
        //     headers: {
        //         'Access-Control-Allow-Origin' : '*'
        //     }
        // });
    } catch (err) {
        console.error(err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        event
    };
    return response;
};

// function(err, data) {
//       if (err) console.log(err);
//       else console.log(data);
//     });