import { GraphQLServer } from 'graphql-yoga';

// define types (schema)
// putting ! at the end of our type means we are going to always get back a string.
const typeDefs = `
  type Query {
      hello: String!
      name: String!
      location: String!
      bio: String!
  }
`

// resolvers are functions that get called when a query is made. each query with it's own function.
const resolvers = {
    Query: {
        hello() {
            return 'This is the first query';
        },
        name() {
            return 'Ayo'
        },
        location() {
            return 'Eket Akwa Ibom';
        },
        bio() {
            return 'I eat and sleep with bugs'
        }
    }
}

const server = new GraphQLServer(
    {
        typeDefs,
        resolvers
    }
);

server.start(() => {
    console.log(`server is running on port ${server.options.port}`);
})