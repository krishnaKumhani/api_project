const express = require("express");

const routs = express.Router();

const passport = require("passport");

const manctl =require("../../../controller/api/v1/ManagerContoller");

routs.post("/ManagerLogin",manctl.ManagerLogin);

routs.get("/ManagerProfile",passport.authenticate('managerjwt',{failureRedirect:"/manager/failGetLogion"}),manctl.ManagerProfile);

routs.put("/EditProfileManager/:id",passport.authenticate('managerjwt',{failureRedirect:"/manager/failGetLogion"}),manctl.EditProfileManager);


routs.post("/EmployeeRegister",passport.authenticate('managerjwt',{failureRedirect:"/manager/failGetLogion"}),manctl.EmployeeRegister);


routs.get("/ViewAllEmployee",passport.authenticate('managerjwt',{failureRedirect:"/manager/failGetLogion"}),manctl.ViewAllEmployee);

routs.delete("/DeleteEmployee/:id",passport.authenticate('managerjwt',{failureRedirect:"/manager/failGetLogion"}),manctl.DeleteEmployee);

routs.get("/failGetLogion",async (req,res)=>{
    return res.status(400).json({msg:"First For Manager Login",status : 0})
})

console.log("Index Routing");

module.exports = routs;