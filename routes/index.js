const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
    require('../models/posts.model');
    const Posts = mongoose.model('posts');

    Posts.find({})
    // .limit(2)
    // .sort('-age')
        .then(posts => {
            console.log(posts);
            res.render('index',
                {
                    title: posts.title,
                    post: posts.post,
                    author: posts.author
                });
        })
        .catch(e => console.log(e))


    // posts.find({},{}, (err, posts) => {
    //     res.render('index', { posts: 'posts' });
    // });
});

module.exports = router;
