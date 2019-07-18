let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const urlecodeParser = bodyParser.urlencoded({
    extended: false
});

/* GET register page. */
router.get('/add', function (req, res, next) {
        console.log("register route");
        res.render('adduser');
   
});

router.post('/add', urlecodeParser,  function (req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let repassword = req.body.re-password;

    console.log("Username = ", username, " email = ", email, " password = ", password, " retype = ", repassword);

    require('../models/users.model');
    const Users = mongoose.model('users');

    const addUser = new Users({
        user: username,
        email: email,
        password: password
    });

    addUser.save()
    .then((user) => {
        //req.flash('success', 'User Added');
        res.location('/');
        res.redirect('/register/add');
        })
    .catch(e => console.log(e));

});

module.exports = router;
