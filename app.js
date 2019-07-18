var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const moment = require('moment');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
const mongooes = require('mongoose');


mongooes.connect("mongodb://nodeblog:nodeblog1@ds347467.mlab.com:47467/nodeblog")
    .then(() => console.log('Connected...'))
    .catch(e => console.log(e));

const urlecodeParser = bodyParser.urlencoded({
    extended: false
});

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const authorsRouter = require('./routes/authors');
const registerRouter = require('./routes/register');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.locals.moment = require('moment');
app.locals.blogPreview = function (text, length) {
    let preview = text.substring(0, length);
    return preview;
};

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(function (req, res, next) {
    req.mongooes = mongooes;
    next();
});

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/authors', authorsRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
