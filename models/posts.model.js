const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    mainimage:{
        type: String,
        required: false
    }
});

mongoose.model('posts', PostsSchema);