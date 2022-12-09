const {body, validationResult} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignup = [body('firstName', 'First name cannot be empty.').notEmpty().trim().escape(), body('lastName', 'Last name cannot be empty.').notEmpty().trim().escape(), body('email', 'Must be a valid email address.').isEmail().trim().escape().normalizeEmail(), body('password', 'Must be between 8 and 64 characters.').isLength({min: 8, max: 64})];

exports.validateLogin = [body('email', 'Must be a valid email address.').isEmail().trim().escape().normalizeEmail(), body('password', 'Must be between 8 and 64 characters.').isLength({min: 8, max: 64})];

exports.validateConnection = [body('topic', 'Topic cannot be empty.').notEmpty().trim().escape(), body('title', 'Title cannot be empty.').notEmpty().trim().escape(), 
                                body('details', 'Details cannot be empty.').notEmpty().trim().escape(), body('date', 'Date cannot be empty.').notEmpty().trim().escape(), 
                                body('startTime', 'Event must have a start time.').notEmpty().trim().escape(), 
                                body('endTime', 'Event must have an end time.').notEmpty().trim().escape()];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect('back');
    } else {
        return next();
    }
};