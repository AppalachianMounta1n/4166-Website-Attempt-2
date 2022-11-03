const model = require('../models/connection.js');

//GET /connections - get a list of all connections
exports.index = (req, res) => {
    let connections = model.find();
    res.render('./connections/connections.ejs', {connections});
};

//GET /connections/new - send form to create a new connection
exports.new = (req, res) => {
    res.render('./connections/newConnection.ejs');
};

//POST /connections - post a new connection to the site
exports.create = (req, res) => {
    let connection = req.body;

    model.saveConnection(connection);
    res.redirect('./connections');
};

//GET /connections/:id - send the connection with the specified ID
exports.details = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findByID(id);

    if(connection) {
        res.render('./connections/connection.ejs', {connection});
    }
    else {
        let err = new Error("The server cannot find the connection with the ID: " + id);
        err.status = 404;
        next(err);
    }
};

//GET /connections/:id/edit - send form to edit a specified connection
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findByID(id);

    if(connection) {
        res.render('./connections/editConnection.ejs', {connection});
    }
    else {
        let err = new Error("The server cannot find the connection with the ID: " + id);
        err.status = 404;
        next(err);
    }
};

//PUT /connections/:id - update the connection with the given ID
exports.update = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findByID(id);

    if(model.updateByID(id, connection)) {
        res.redirect('./connections/' + id);
    }
    else {
        let err = new Error("The server cannot find the connection with the ID: " + id);
        err.status = 404;
        next(err);
    }
};

//DELETE /connections/:id - delete the specified connection
exports.delete = (req, res, next) => {
    let id = req.params.id;

    if(model.delete(id)) {
        res.redirect('./connections/connections.ejs');
    }
    else {
        let err = new Error("The server cannot find the connection with the ID: " + id);
        err.status = 404;
        next(err);
    }
};