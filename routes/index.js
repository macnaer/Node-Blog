const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
    require('../models/posts.model');
    require('../models/categories.model');
    require('../models/authors.model');
    const Authors = mongoose.model('author');
    const Posts = mongoose.model('posts');
    const Categories = mongoose.model('category');
    Posts.find({}).sort({"date": -1})
        .then(posts => {
            Categories.find({})
                .then(categories => {
                    Authors.find({})
                        .then(authors => {
                                res.render('index', {
                                    posts: posts,
                                    categories: categories,
                                    authors: authors
                                })
                            }
                        )
                        .catch(err => console.log(err))
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))

});

module.exports = router;
