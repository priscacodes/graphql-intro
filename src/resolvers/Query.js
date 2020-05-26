const Query = {
    greeting(parent, args, ctx, info){ // the parent parameter contains relationships in relational db, args are the arguments passed in from the clients query , ctx is context that is passed across an app, info is information about the query
        if (args.name && args.position) {
            return `Hello ${args.name} you are my favorite ${args.position}`
        } else {
            return 'Hello anonymous'
        }
    },
   me(parent, args, { db }, info) {
       return db.demoUsers[1]
   },
   post(parent, args, ctx, info) {
        return ctx.db.demoPosts[0]
   },
 users(parent, args, ctx, info) {
    if (!args.query) {
        return ctx.db.demoUsers;
    } 
    return ctx.db.demoUsers.filter((x) => { 
        return x.name.toLowerCase().includes(args.query.toLowerCase())
    });  
   },
   posts(parent, args, { db }, info) {
    if (!args.query) {
        return db.demoPosts;
    } 
    return db.demoPosts.filter((x) => { 
        return x.title.toLowerCase().includes(args.query.toLowerCase())
    });  
   },
   comments(parent, args, { db }, info) {
       if (!args.query) {
           return db.demoComments;
       }
   }
}

export default Query;
