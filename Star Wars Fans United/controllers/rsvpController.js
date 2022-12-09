const User = require('../models/user.js');
const model = require('../models/connection.js');
const regmodel = require('../models/rsvp.js');

exports.rsvp = (req, res, next) => {
    let rsvp = new regmodel(req.body);
    let userID = req.session.user;
    let connectionID = req.params.id;

    Promise.all([User.findById(userID), model.findById(connectionID)]).then(results => {
        const [user, connection] = results;

        rsvp.user = user;
        rsvp.connection = connection;
        rsvp.connectionName = connection.title;

        rsvp.save().then(rsvp => {
            req.flash('success', 'Registered for this event.');
            res.redirect('/connections');
        }).catch(err => {
            if (err.name == "ValidationError") {
                req.flash('error', err.message);
                return res.redirect('back');
            }
            if (err.code == 11000) {
                req.flash('error', 'You have already registered for this event.');
                return res.redirect('back');
            }

            next(err);
        });
    }).catch(err => next(err));
};

exports.rsvpUndo = (req, res, next) => {

};