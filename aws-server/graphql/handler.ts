/* Set up guide available on: https://www.apollographql.com/docs/apollo-server/deployment/lambda/ */
import { ApolloServer } from 'apollo-server-lambda';

import { resolvers } from './resolvers';
import { typeDefs } from './schemaTypes';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Setting up GraphQL Playground
    playground: {
        endpoint: "/dev/graphql"
    },
    // context: ({ event, context }) => ({
    //     headers: event.headers,
    //     functionName: context.functionName,
    //     event,
    //     context,
    // }),
});

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});
