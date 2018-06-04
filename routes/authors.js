let express = require('express');
let router = express.Router();
const multer = require('multer');
const mongo = require('mongodb');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/add', function (req, res, next) {
    require('../models/authors.model');
    const Author = mongoose.model('author');
    Author.find({})
        .then(authors => {
            console.log(authors);
            res.render('addauthor', {authors: authors});
        })
        .catch(e => console.log(e))
});

router.post('/add', function (req, res, next) {
        let author = req.body.author;

        req.checkBody('author', 'Author field is required').notEmpty();

        let errors = req.validationErrors();
        if (errors) {
            res.render('addauthor', {
                "errors": errors
            });
        } else {
            require('../models/authors.model');
            const Author = mongoose.model('author');

            const addAuthors = new Author({
                author: author,
            });

            addAuthors.save()
                .then((author) => {
                    req.flash('success', 'Authors Added');
                    res.location('/');
                    res.redirect('/authors/add');
                })
                .catch(e => console.log(e))
        }

    }
);

module.exports = router;
