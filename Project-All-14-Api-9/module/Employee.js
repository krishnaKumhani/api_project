const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
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
    ManagerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Manager",
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

const Employee = mongoose.model('Employee',EmployeeSchema);

console.log("Employee Module");

module.exports = Employee;