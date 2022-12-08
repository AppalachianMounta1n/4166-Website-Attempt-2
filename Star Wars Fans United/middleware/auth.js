const Connection = require('../models/connection');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else {
         req.flash('error', 'You are already logged in');
         return res.redirect('/users/profile');
     }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.user){
        return next();
    }else {
         req.flash('error', 'You must login before you can complete this action.');
         return res.redirect('/users/login');
     }
};

//check if user is the host of an event
exports.isHost = (req, res, next) =>{
    let id = req.params.id;
    Connection.findById(id).then(connection => {
        if(connection) {
            if(connection.host == req.session.user) {
                return next();
            } else {
                let err = new Error('Not authorized to access this.');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a connection with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    }).catch(err=>next(err));
};