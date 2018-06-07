let express = require('express');
let router = express.Router();
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const mongo = require('mongodb');
const mongooes = require('mongoose');


router.get('/add', function (req, res, next) {
    require('../models/categories.model');
    require('../models/authors.model');
    const Author = mongooes.model('author');
    const Categories = mongooes.model('category');
    Categories.find({})
        .then(categories => {
            Author.find({})
                .then((authors) => {
                    res.render('addpost', {
                        authors: authors,
                        categories: categories
                    });
                })
        })
        .catch(e => console.log(e))
});

router.post('/add', upload.single('mainimage'), function (req, res, next) {
        let title = req.body.title;
        let category = req.body.category;
        let post = req.body.post;
        let author = req.body.author;
        let date = new Date();

        if (req.file) {
            var mainimage = req.file.filename;
        }
        else {
            var mainimage = 'Default.png';
        }


        req.checkBody('title', 'Title field is required').notEmpty();
        req.checkBody('post', 'Body field is required').notEmpty();

        let errors = req.validationErrors();
        if (errors) {
            res.render('addpost', {
                "errors": errors
            });
        } else {
            require('../models/posts.model');
            const Posts = mongooes.model('posts');

            const addPost = new Posts({
                title: title,
                post: post,
                author: author,
                category: category,
                date: date,
                mainimage: mainimage,
            });

            addPost.save()
                .then((post) => {
                    console.log(post);
                    req.flash('success', 'Post Added');
                    res.location('/');
                    res.redirect('/');
                })
                .catch(e => console.log(e))
        }
    }
);

router.get('/show/:id', function (req, res, next) {
    require('../models/posts.model');
    const singePost = mongooes.model('posts');
    singePost.findById(req.params.id)
        .then(post => {
            res.render('singlepost', {
                post: post,
            })
        })
        .catch(e => console.log(e))
});

module.exports = router;
