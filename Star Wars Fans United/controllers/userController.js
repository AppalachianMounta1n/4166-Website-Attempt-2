const model = require('../models/user');
const Connection = require('../models/connection');
const {validationResult} = require('express-validator');

exports.new = (req, res)=>{
    return res.render('./users/signup');
};

exports.create = (req, res, next)=>{
    let user = new model(req.body);
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
    user.save().then(user=> {
        req.flash('success', 'Registration succeeded!');
        res.redirect('/users/login');
    }).catch(err => {
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('back');
        }
        if(err.code === 11000) {
            req.flash('error', 'Invalid account information');  
            return res.redirect('back');
        }
        next(err);
    });
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./users/login');
}

exports.login = (req, res, next)=>{
    if (email) {
        email = req.body.email.toLowerCase();
    }
    let password = req.body.password;
    model.findOne({email: email}).then(user => {
        if (!user) {
            req.flash('error', 'Invalid login information');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'Invalid login information');      
                res.redirect('/users/login');
            }
            });     
        }     
    }).catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Connection.find({host: id})]).then(results => {
        const [user, connections] = results;
        res.render('./users/profile', {user, connections});
    }).catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) {
            return next(err);
        }
        else {
            res.redirect('/');
        }
    });
};