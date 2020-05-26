const User =  {
    posts(parent, args, { db }, info) {
        return db.demoPosts.filter((x) => {
            return x.author === parent.id;
        })
    },
    comments(parent, args, { db }, info) {
       return db.demoComments.filter((x) => {
           return x.author === parent.id;
       })
   }
   }

   export default User;