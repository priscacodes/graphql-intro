// demo users data 

let demoUsers = [
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

let demoPosts = [
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
let demoComments = [
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

const db = {
    demoUsers,
    demoPosts,
    demoComments
}

export default db;
