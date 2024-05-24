const mongoose = require("mongoose");

const ManagerSchema = mongoose.Schema({
    name:{
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
    },
    age : {
        type : Number,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
    status : {
        type : String,
        required : true
    },
    create_date : {
        type : String,
        required : true
    },
    update_date : {
        type : String,
        required : true
    },
});

const Manager = mongoose.model('Manager',ManagerSchema);

console.log("Manager Module");

module.exports = Manager;