const express = require('express')
const dotenv = require('dotenv')
const result = dotenv.config()
const bodyParser = require('body-parser')
const auth = require('./utils/auth')
const app = express()

auth.initialization(app)

app.listen(process.env.SERVER_PORT, function () {
    console.log('Server is listening at: '+process.env.SERVER_PORT)
})

if (result.error) {
    throw result.error
}
// console.log(result.parsed)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine','ejs')
app.set('views','views')
app.use('/login',require('./controllers/login.route'))
app.use('/profile', require('./controllers/profile.route'))
app.use('/artists', require('./controllers/artists.route'))
app.use('/bands',require('./controllers/bands.route'))
app.use('/', require('./controllers/artists.route'))
