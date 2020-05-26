const Post = {
    // this author method is called when the query gets to the place when author field is called on Post
 author(parent, args, { db }, info) {
     return db.demoUsers.find((x) => {
         return x.id == parent.author;
     });
    
 },
 comments(parent, args, { db }, info) {
    return db.demoComments.filter((x) => {
        return x.post === parent.id;
    })
}
}

export default Post;
