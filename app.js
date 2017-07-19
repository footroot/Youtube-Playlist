var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Start connection

var mongooseClient = require("./bin/mongoose_client");
mongooseClient.connectDB(function () {
    console.log("db connection successful");
}, function (err) {
    console.log("Error" + err);
});


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Start here
//API's and routing

//plan
//users vaala same as assign2
//then playlist vaala collection will have a field of username which will tell us created by which user
//in each playlist one field public should be there by default to false . public playlists can be accessed by anyone

//Praveen
var playlistHandler = require("./routes/playlistHandler");
app.use('/api/playlists',playlistHandler);

//Mishal
/*
var logoutHandler = require("./routes/logoutHandler");
var usersHandler = require("./routes/usersHandler");
app.use('/api/logout', logoutHandler);
app.use('/api/users', usersHandler);
*/




//End here







// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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