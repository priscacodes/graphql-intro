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

const demoPosts = [
    {
        id: 'dfjhfja4af987d9f79d9av8',
        title: 'My first post',
        body: 'This is the body of the post',
        published: true,
        author: 'jkjkdhgchddcnbnn4'
    },
    {
        id: 'dhfjdjhdjncmnxnmcamdca',
        title: 'My second post',
        body: 'This is the body of the post',
        published: true,
        author: 'jkjkdhgchddcnbnn4'
    },
    {
        id: '9898898dvvdjdkvkjvppp',
        title: 'My third post',
        body: 'This is the body of the post',
        published: true,
        author: 'jkjkdhgchddclldlkd99934878'
    },
    {
        id: '990099846dyydiicjcjdcjhdjc',
        title: 'My fourth post',
        body: 'This is the body of the post',
        published: true,
        author: 'jkjkdhgchddclldlkd99934878'
    }
]
const demoComments = [
    {
        id: 'dfjhfja4af987d9f79d9av908',
        text: 'My first comment',
        author: 'jkfkjkjkrfvv24',
        post: 'dhfjdjhdjncmnxnmcamdca'
    },
    {
        id: 'dhfjdjhdjncmnxnmcamdca98848ch',
        text: 'My second comment',
        author: 'jkjkdhgchddcnbnn4',
        post: '990099846dyydiicjcjdcjhdjc'
    },
    {
        id: '9898898dvvdjdkvkjvpppwjdkjk998',
        text: 'My third comment',
        author: 'jkjkdhgchddclldlkd99934878',
        post: 'dfjhfja4af987d9f79d9av8'
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
      posts(query: String) : [Post!]!
      comments: [Comment!]!
  }
  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]
      comments: [Comment!]
  }
  type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]
  }
  type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
           return demoUsers[1]
       },
       post() {
            return demoPosts[0]
       },
     users(parent, args, ctx, info) {
        if (!args.query) {
            return demoUsers;
        } 
        return demoUsers.filter((x) => { 
            return x.name.toLowerCase().includes(args.query.toLowerCase())
        });  
       },
       posts(parent, args, ctx, info) {
        if (!args.query) {
            return demoPosts;
        } 
        return demoPosts.filter((x) => { 
            return x.title.toLowerCase().includes(args.query.toLowerCase())
        });  
       },
       comments(parent, args, ctx, info) {
           if (!args.query) {
               return demoComments;
           }
       }
    },
    Post: {
        // this author method is called when the query gets to the place when author field is called on Post
     author(parent, args, ctx, info) {
         return demoUsers.find((x) => {
             return x.id == parent.author;
         });
     },
     comments(parent, args, ctx, info) {
        return demoComments.filter((x) => {
            return x.post === parent.id;
        })
    }
 },
    User: {
     posts(parent, args, ctx, info) {
         return demoPosts.filter((x) => {
             return x.author === parent.id;
         })
     },
     comments(parent, args, ctx, info) {
        return demoComments.filter((x) => {
            return x.author === parent.id;
        })
    }
    },
    Comment: {
        // this author method is called when the query gets to the place when author field is called on Post
     author(parent, args, ctx, info) {
         return demoUsers.find((x) => {
             return x.id == parent.author;
         });
     },
     post(parent, args, ctx, info) {
        return demoPosts.find((x) => {
            return x.id == parent.post;
        });
    }
 },
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