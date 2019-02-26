const createError = require('http-errors');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const {getHomePage} = require('./routes/index');
const {addPropertyPage, addProperty, deleteProperty, editProperty, editPropertyPage} = require('./routes/property');

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'dwellsy',
  password: 'dwellsy',
  database: 'dwellsy'
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // parse form data client
app.use(fileUpload()); // configure fileupload

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes for the app
app.get('/', getHomePage);
app.get('/add', addPropertyPage);
app.get('/edit/:id', editPropertyPage);
app.get('/delete/:id', deleteProperty);
app.post('/add', addProperty);
app.post('/edit/:id', editProperty);

module.exports = app;
