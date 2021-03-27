const path = require('path');
const app = require('express')();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// const routes = require('./controllers/');


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3001;