const express = require('express')
const dotenv = require('dotenv')
const result = dotenv.config()
const bodyParser = require('body-parser')
const auth = require('./utils/auth')
const app = express()
const path = app.path()

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js; style-src 'self' https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css; frame-src 'self'"
  );
  next();
});

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
app.use(path+'/login',require('./controllers/login.route'))
app.use('/profile', require('./controllers/profile.route'))
app.use('/artists', require('./controllers/artists.route'))
app.use('/bands',require('./controllers/bands.route'))
app.use('/', require('./controllers/artists.route'))
