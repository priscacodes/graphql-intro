import { GraphQLServer } from 'graphql-yoga';

// demo users data 
const demoUsers = [
    {
        id: 'jkfkjkjkrfvv24',
        age: 26,
        name: 'Ayooluwa',
        email: 'ayo@email.com'
    },
    {
        id: 'jkjkdhgchddcnbnn4',
        age: 26,
        name: 'Toyin',
        email: 'Toyin@email.com'
    },
    {
        id: 'jkjkdhgchddclldlkd99934878',
        age: 26,
        name: 'Moyin',
        email: 'Moyin@email.com'
    }
]
// scalar type this are types that store single values
// String, Boolean, Int, Float, ID

// define types (schema)
// putting ! at the end of our type means we are going to always get back a string.
const typeDefs = `
  type Query {
      greeting(name: String, position: String): String!
      me: User!
      post: Post!
      users(query: String): [User!]!
  }
  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
  }
  type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
  }
`

// resolvers are functions that get called when a query is made. each query with it's own function.
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info){ // the parent parameter contains relationships in relational db, args are the arguments passed in from the clients query , ctx is context that is passed across an app, info is information about the query
            if (args.name && args.position) {
                return `Hello ${args.name} you are my favorite ${args.position}`
            } else {
                return 'Hello anonymous'
            }
        },
       me() {
           return {
               id: 'askkjjk57878jfdshj',
               name:'Ayooluwa',
               email: 'ayooluwa@email.com'
           }
       },
       post() {
            return {
                id: 'dfjhfja4af987d9f79d9av8',
                title: 'My first post',
                body: 'This is the body of the post',
                published: true,
            }
       },
       users(parent, args, ctx, info) {
        if (!args.query) {
            return demoUsers;
        } 
        return demoUsers.filter((x) => { 
            return x.name.toLowerCase().includes(args.query.toLowerCase())
        });  
       }
    }
};

const server = new GraphQLServer(
    {
        typeDefs,
        resolvers
    }
);

server.start(() => {
    console.log(`server is running on port ${server.options.port}`);
})