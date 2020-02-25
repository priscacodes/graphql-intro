import { GraphQLServer } from 'graphql-yoga';


// scalar type this are types that store single values
// String, Boolean, Int, Float, ID

// define types (schema)
// putting ! at the end of our type means we are going to always get back a string.
const typeDefs = `
  type Query {
      id: ID!
      hello: String!
      name: String!
      location: String!
      bio: String!
      employed: Boolean!
      gpa: Float
      age: Int!
  }
`

// resolvers are functions that get called when a query is made. each query with it's own function.
const resolvers = {
    Query: {
        id() {
            return 'abc1234ghtyru556llkklkljkj5';
        },
        age() {
            return 26;
        },
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
        },
        gpa() {
            return null;
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