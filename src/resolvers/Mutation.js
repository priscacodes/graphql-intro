import { v4 } from 'uuid';

const Mutation = {
    createUser(parent, args, ctx, info) {
        const emailTaken = ctx.db.demoUsers.some((x) =>  x.email == args.data.email)
        if (emailTaken) throw new Error('Email already taken');
        const user = {
          id: v4(),
          ...args.data
      }
       ctx.db.demoUsers.push(user);
       return user;
    },

    deleteUser(parent, args, { db }, info) {
      const userFound = db.demoUsers.findIndex((x) => x.id === args.id);
      if ( userFound === -1) {
          throw new Error('User not found')
      }
      const deletedUser = db.demoUsers.splice(userFound, 1);
      db.demoPosts = db.demoPosts.filter((post) => {
          const match = post.author === args.id

          if (match) {
              db.demoComments = db.demoComments.filter((x) => x.post !== post.id)
          }

          return !match
      })

       db.demoComments = db.demoComments.filter((com) => com.author !== args.id);
       return deletedUser[0];
    },

    updateUser(parent, args, { db }, info) {
     const user = db.demoUsers.find((x) => x.id === args.id);
     if (!user) {
         throw new Error('User not found')
     }
     if (typeof args.data.email === 'string'){
         const emailTaken = db.demoUsers.some((user) => user.email === args.data.email)
         if (emailTaken) {
             throw new Error('Email taken');
         }
         user.email = args.data.email

     }
     if (typeof args.data.name === 'string'){
       
        user.name = args.data.name

    }

    if (typeof args.data.age !== 'undefined') {
        user.age = args.data.age;
    }
    return user;
    },

    updatePost(parent, args, { db, pubsub }, info) {
        const post = db.demoPosts.find((x) => x.id === args.id);
        const originalPost = {
            ...post
        }
        if (!post) {
            throw new Error('Post not found')
        }
        if (typeof args.data.title === 'string'){
            post.title = args.data.title
   
        }
        if (typeof args.data.body === 'string'){
          
           post.body = args.data.body
   
       }
   
       if (typeof args.data.isPublished !== 'boolean') {
           post.published = args.data.published;
           
           // if the original post was published and now the updated one is not published
           if (originalPost.published && !post.published) {
            // fire deleted event
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: originalPost
                }
            })

           } else if (!originalPost.published && post.published) { // if it was never published but now published
               // fire created event
               pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            })
           } else if (post.published) { // if the published has been published but the content just updated
            // fire update event
            pubsub.publish('post', {
             post: {
                 mutation: 'UPDATED',
                 data: post
             }
         })
        }
       } 

       return post;
       },

    createPost(parent, args, { db, pubsub }, info) {
        const userExist = db.demoUsers.some((x) => x.id === args.data.author);
        if(!userExist){
            throw new Error('User not found');
        }
        const post = {
            id :v4(),
            ...args.data
        }
        db.demoPosts.push(post);
        if (args.data.published === true) {
          pubsub.publish('post', {
              post: {
                  mutation: 'CREATED',
                  data: post
              }
          })
        }
        return post;
    },

    deletePost(parent, args, { db, pubsub }, info) {
        const postFound = db.demoPosts.findIndex((post) => post.id === args.id);
        if (postFound === -1) {
            throw new Error('Post not found');
        } 
        // here we deStructured the array coming back from splice method
        const [thePost, second] = db.demoPosts.splice(postFound, 1);
        db.demoComments = db.demoComments.filter((comment) => comment.post !== args.id)
        if (thePost.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: thePost
                }
            })
          }
        return thePost
    },

    createComment(parent, args, { db, pubsub }, info) {
        const userExist = db.demoUsers.some((x) => x.id === args.data.author);
        const postExist = db.demoPosts.some((x) => x.id === args.data.post && x.published);
        if (!userExist || !postExist) {
            throw new Error('Unable to find user and post');
        }

        const comment = {
            id: v4(),
            ...args.data
        };
        db.demoComments.push(comment);
        pubsub.publish(`comment${args.data.post}`, {
            comment: {
                data: comment,
                mutation: 'CREATED'
            },
        })
        return comment;
    },

    deleteComment(parent, args, { db, pubsub }, info) {
        const commentFound  = db.demoComments.findIndex((com) => com.id === args.id)
        if (commentFound === -1) {
            throw new Error('comment not found');
        }

        const [ deletedComment, another ] = db.demoComments.splice(commentFound, 1)
        pubsub.publish(`comment${deletedComment.post}`, {
            comment: {
                data: deletedComment,
                mutation: 'DELETED'
            },
        })
        return deletedComment;
    }
  }

  export default Mutation;