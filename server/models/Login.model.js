const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "employee"
    },
    password : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model("Login", loginSchema)