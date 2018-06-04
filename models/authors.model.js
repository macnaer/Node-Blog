const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    author:{
        type: String,
        required: true
    }
});

mongoose.model('author', AuthorSchema);
