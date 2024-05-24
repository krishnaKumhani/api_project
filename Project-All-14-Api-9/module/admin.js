const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
});

const Admin = mongoose.model('Admin',AdminSchema);

console.log("Admin Module");

module.exports = Admin;