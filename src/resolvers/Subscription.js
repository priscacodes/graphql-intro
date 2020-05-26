const Subscription = {
  // here we are listening to comments on a particular post that we want
  comment: {
      subscribe(parent, args, { db, pubsub }, info) {
          const post = db.demoPosts.find((x) => x.id === args.postId && x.published)
          if (!post) {
              throw new Error('Post not found')
          }
          return pubsub.asyncIterator(`comment${args.postId}`)
      }
  },

  // listen to new post that is created
  post: {
      subscribe(parent, args, { pubsub }, info){
          return pubsub.asyncIterator('post');
      }
  }
}

export default Subscription