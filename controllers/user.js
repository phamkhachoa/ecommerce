const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err : errorHandler(err)
            });
        }
        console.log(user);
        user.salt = undefined;
        user.hashed_password = undefined;
        console.log(user);
        res.json({
            user
        })
    });
    
};

exports.signin = (req, res) => {
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err : errorHandler(err)
            });
        }
        console.log(user);
        user.salt = undefined;
        user.hashed_password = undefined;
        console.log(user);
        res.json({
            user
        })
    });
    
};
