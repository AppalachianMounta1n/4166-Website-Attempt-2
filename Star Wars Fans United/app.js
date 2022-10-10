//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes.js');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//routing middleware
app.use('/connections', connectionRoutes);

//routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});

//start server
app.listen(port, host, () => {
    console.log('The server is running on port', port);
});