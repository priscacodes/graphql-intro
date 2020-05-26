import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';



const pubsub = new PubSub();

// resolvers are functions that get called when a query is made. each query with it's own function.
const resolvers = {
    Query,
    Mutation,
    Post,
    User,
    Comment,
    Subscription,
};

const server = new GraphQLServer(
    {
        typeDefs: `./src/schema.graphql`,
        resolvers,
        context: {
            db,
            pubsub,
        }
    }
);

server.start(() => {
    console.log(`server is running on port ${server.options.port}`);
})