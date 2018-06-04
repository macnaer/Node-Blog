let express = require('express');
let router = express.Router();
const multer = require('multer');
const mongo = require('mongodb');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/add', function (req, res, next) {
    require('../models/categories.model');
    const Category = mongoose.model('category');
    Category.find({})
        .then(categories => {
            res.render('addcategories', {categories: categories});
        })
        .catch(e => console.log(e))
});

router.post('/add', function (req, res, next) {
        let category = req.body.category;

        req.checkBody('category', 'Category field is required').notEmpty();

        let errors = req.validationErrors();
        if (errors) {
            res.render('addcategories', {
                "errors": errors
            });
        } else {
            require('../models/categories.model');
            const Categories = mongoose.model('category');

            const addCategories = new Categories({
                category: category,
            });

            addCategories.save()
                .then((post) => {
                    console.log(post);
                    req.flash('success', 'Category Added');
                    res.location('/');
                    res.redirect('/categories/add');
                })
                .catch(e => console.log(e))
        }

    }
);

module.exports = router;
