const bcrypt = require('bcrypt');

const UserModel = require('../models/User');
const PostModel = require("../models/Post");

exports.register_form = (req, res) => {
    let username = "";
    let password = "";
    let data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username;
        password = data.password;
    }
    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
    }); //{errors: req.session.validationErrors}
};


exports.register = (req, res)=>{
    UserModel.create(req.body, (err, model)=>{
        if(err){
            const validationErrors = Object.keys(err.errors)
                .map(key => err.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            // req.session.validationErrors = validationErrors;
            res.redirect('/users/register');
        }else{
            res.redirect('/');
        }
    });
};


exports.login_form = (req, res)=>{
    res.render('login');
};


exports.login = (req, res) => {
    UserModel.findOne({
            username: req.body.username,
        })
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.password, user.password, (error, same)=>{
                    if(same){
                        req.session.userId = user._id
                        res.redirect('/');
                    }
                    else{
                        res.redirect('/users/login');
                    }
                });
            }
            else{
                res.redirect('/users/login');
            }
        })
        .catch(err => console.log(err));
};


exports.logout = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
};



