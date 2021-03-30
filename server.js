var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
app.set('port', 9000);
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
})); 

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user){
        res.clearCookie('user_sid');
    }
    next();
});

var hbsContent = {userName:'', loggedin: false, title:"You are not logged in", body: "Hello World"};

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// route for handling 404 requests(unavailable route)
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


app.use(require('./controllers'));

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));