require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authCtrl')
const treasureCtrl = require('./controllers/treasureCtrl')
const auth = require('./middleware/authMiddleware')

const app = express()
const SERVER_PORT = 4000

const {CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))