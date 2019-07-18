const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

mongoose.model('users', UsersSchema);
