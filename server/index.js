require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const userCtrl = require('./controllers/user')
const postCtrl = require('./controllers/posts')

const app = express()
app.use(express.json())

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
)

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register)
app.post('/api/auth/login', userCtrl.login)
app.get('/api/auth/me', userCtrl.getUser)
app.post('/api/auth/logout', userCtrl.logout)

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts)
app.post('/api/post', postCtrl.createPost)
app.get('/api/post/:id', postCtrl.readPost)
app.delete('/api/post/:id', postCtrl.deletePost)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Ready')
    app.listen(SERVER_PORT, () => {
        console.log(`App listening on port ${SERVER_PORT}`)
    })
})
