//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const connectionRoutes = require('./routes/connectionRoutes.js');
const mainRoutes = require('./routes/mainRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = "mongodb://localhost:27017/NBAD"
app.set('view engine', 'ejs');

//connect and start server
mongoose.connect(url).then(() => {
    //start server
    app.listen(port, host, () => {
        console.log('The server is running on port', port);
    });
}).catch(err => console.log(err.message));

//mount middleware
app.use(
    session({
        secret: "fkjeoj983j8923junfn93jf98",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());
app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//routing middleware
app.use('/', mainRoutes);
app.use('/connections', connectionRoutes);
app.use('/users', userRoutes);

//error-handling middleware
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => { //this must be the last middleware function loaded
    console.log(err.stack);
    
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});