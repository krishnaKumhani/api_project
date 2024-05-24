const express = require("express");

const routs = express.Router();

const passport = require("passport");

const empctl = require("../../../controller/api/v1/EmployeeContorller");

routs.post("/EmplyoeeLogin",empctl.EmplyoeeLogin);

routs.get("/EmployeeProfile",passport.authenticate("Employeejwt",{failureRedirect:"/employee/failLogin"}),empctl.EmployeeProfile);

routs.get("/failLogin",async(req,res)=>{
    return res.status(400).json({msg : "First For Your Login",status :0});
})
console.log("Employee Routing");

module.exports = routs;