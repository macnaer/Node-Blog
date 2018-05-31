let express = require('express');
let router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const mongo = require('mongodb');
const db = require('mongoose');

/* GET home page. */
router.get('/add', function (req, res, next) {
    res.render('addpost', {
        title: "Add post"
    });
});

router.post('/add', upload.single('mainimage'), function (req, res, next) {
        let title = req.body.title;
        // let category = req.body.category;
        let post = req.body.post;
        let author = req.body.author;
        let date = new Date();

        if (req.file) {
            let mainimage = req.file.name;
        } else {
            let mainimage = 'default.png';
        }

        req.checkBody('title', 'Title field is required').notEmpty();
        req.checkBody('post', 'Body field is required').notEmpty();

        let errors = req.validationErrors();
        if (errors) {
            res.render('addpost', {
                "errors": errors
            });
        } else {
            // let posts = db.get('posts');
            // posts.insert({
            //     "title": title,
            //     "body": body,
            //     "category": category,
            //     "date": date,
            //     "author": author,
            //     "mainimage": mainimage
            // }, function (err, post) {
            //     if (err) {
            //         res.send(err);
            //     } else {
            //         req.flash('success', 'Post Added');
            //         res.location('/');
            //         res.redirect('/');
            //     }
            // });
            require('../models/posts.model');
            const Posts = db.model('posts');

            const addPost = new Posts({
                title: title,
                post: post,
                author: author,
                // date: date,
                // author: author,
            });

            addPost.save()
                .then((post) => {
                    console.log(post);
                    req.flash('success', 'Post Added');
                    res.location('/');
                    res.redirect('/');
                })
                .catch(e => console.log(e)),

                function (err, post) {
                    if (err) {
                        res.send(err);
                    } else {
                        req.flash('success', 'Post Added');
                        res.location('/');
                        res.redirect('/');
                    }


                }
        }

    }
);

module.exports = router;
