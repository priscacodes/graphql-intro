const Comment = {
    // this author method is called when the query gets to the place when author field is called on Post
 author(parent, args, { db }, info) {
     return db.demoUsers.find((x) => {
         return x.id == parent.author;
     });
 },
 post(parent, args, { db }, info) {
    return db.demoPosts.find((x) => {
        return x.id == parent.post;
    });
}
}

export default Comment;
