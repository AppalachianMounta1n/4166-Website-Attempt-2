//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const connectionRoutes = require('./routes/connectionRoutes.js');
const mainRoutes = require('./routes/mainRoutes.js');

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
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//routing middleware
app.use('/', mainRoutes);
app.use('/connections', connectionRoutes);

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