const express = require("express");

const routs = express.Router();

const passport = require("passport");

const AdminCtl = require("../../../controller/api/v1/AdminController");

routs.post("/AdminRegister",AdminCtl.AdminRegister);

routs.post("/AdminLogin",AdminCtl.AdminLogin);

routs.post("/ManagerRegister",passport.authenticate('jwt',{failureRedirect:"/admin/failGetLogion"}),AdminCtl.ManagerRegister);

routs.get("/ViewAllManager",passport.authenticate('jwt',{failureRedirect:"/admin/failGetLogion"}),AdminCtl.ViewAllManager);

routs.delete("/DeleteManager/:id",passport.authenticate('jwt',{failureRedirect:"/admin/failGetLogion"}),AdminCtl.DeleteManager);

routs.get("/ViewAllEmployee",passport.authenticate('jwt',{failureRedirect:"/admin/failGetLogion"}),AdminCtl.ViewAllEmployee);


routs.get("/failGetLogion",async(req,res)=>{
    return res.status(400).json({msg : "First For Login",status : 0})
})

console.log("Admin Routing");

module.exports = routs;