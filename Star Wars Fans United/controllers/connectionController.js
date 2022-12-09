const model = require('../models/connection.js');

//GET /connections - get a list of all connections
exports.index = (req, res, next) => {
    model.find().then((connections) => res.render('./connections/connections.ejs', {connections})).catch(err => next(err));
};

//GET /connections/new - send form to create a new connection
exports.new = (req, res) => {
    res.render('./connections/newConnection.ejs');
};

//POST /connections - post a new connection to the site
exports.create = (req, res, next) => {
    let connection = new model(req.body); //create document
    connection.host = req.session.user;
    connection.save().then((connection) => {
        req.flash('success', 'Event created successfully!');
        res.redirect('/connections');
    }).catch(err => {
        if (err.name === "ValidationError") {
            err.status = 400;
        }
        next(err);
    });
};

//GET /connections/:id - send the connection with the specified ID
exports.details = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { //checks ID validity
        let err = new Error('Invalid connection ID');
        err.status = 400;
        return next(err);
    };

    
    let connection = model.findById(id).populate("host", "firstName lastName").then(connection => {
        if (connection) {
            res.render('./connections/connection.ejs', {connection});
        } else {
            let err = new Error('The server could not find the connection with ID: ' + id);
            err.status = 404;
            next(err);
        };
    }).catch(err => next(err));
};

//GET /connections/:id/edit - send form to edit a specified connection
exports.edit = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { //checks ID validity
        let err = new Error('Invalid connection ID');
        err.status = 400;
        return next(err);
    };

    model.findById(id).then(connection => {
        if (connection) {
            res.render('./connections/editConnection', {connection});
        } else {
            let err = new Error('The server could not find the connection with ID: ' + id);
            err.status = 404;
            next(err);
        };
    }).catch(err => next(err));
};

//PUT /connections/:id - update the connection with the given ID
exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { //checks ID validity
        let err = new Error('Invalid connection ID');
        err.status = 400;
        return next(err);
    };

    model.findByIdAndUpdate(id, connection, {findAndModify: false, runValidators: true}).then(connection => {
        if (connection) {
            res.redirect('/connections/' + id);
        } else {
            let err = new Error('The server could not find the connection with ID: ' + id);
            err.status = 404;
            next(err);
        }
    }).catch(err => {
        if (err.name === "ValidationError") {
            err.status = 400;
        }
        next(err)
    });
};

//DELETE /connections/:id - delete the specified connection
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { //checks ID validity
        let err = new Error('Invalid connection ID');
        err.status = 400;
        return next(err);
    };

    model.findByIdAndDelete(id, {useFindAndModify: false}).then(connection => {
        if (connection) {
            res.redirect('/connections');
        } else {
            let err = new Error('The server could not find the connection with ID: ' + id);
            err.status = 404;
            next(err);
        }
    }).catch(err => next(err));
};