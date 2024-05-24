const Admin = require("../../../module/admin");
const Employee = require("../../../module/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Manager = require("../../../module/manager");
const moment = require("moment");
const nodemailer = require("nodemailer");


// AdminRegister
module.exports.AdminRegister = async(req,res)=>{
    try{
        console.log(req.body);
        let cheackEmail = await Admin.findOne({email:req.body.email});
        if(!cheackEmail){
            if(req.body.password == req.body.confirm_password){
                req.body.password = await bcrypt.hash(req.body.password,10);
                req.body.role = 'Admin'
                let admindata = await Admin.create(req.body);
                if(admindata){
                    return res.status(200).json({msg : "your reginstion successfully",status : 1 ,data : admindata})
                }
                else
                {
                    return res.status(400).json({msg : "recored is not find" , status : 0})
                }
            }
            else{
                return res.status(400).json({msg : "password and comfirm pasword are not match",status : 0})
            }
        }
        else{
            return res.status(400).json({mag : "Email is Already Exist" , status : 0})
        }
    }
    catch{
        return res.status(400).json({"msg" : "something is worng" , status : 0});
    }
}

// AdminLogin
module.exports.AdminLogin = async(req,res)=>{
    try{
        console.log(req.body);
        let cheackEmail = await Admin.findOne({email : req.body.email});
        if(cheackEmail){
            if(await bcrypt.compare(req.body.password,cheackEmail.password)){
                let token = jwt.sign({Admindata : cheackEmail},"project",{expiresIn : '1h'});
                return res.status(400).json({msg:"login is SuccessFully",status:1 ,data : token});
            }
            else{
                return res.status(400).json({msg:"Not password",status:0});
            }
        }
        else{
            return res.status(400).json({msg:"Not Email",status:0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Somthing is worng",status:0});
    }
}

// ManagerRegister
module.exports.ManagerRegister = async(req,res)=>{
    try{
        req.body.password = req.body.name + "@" + Math.round(Math.random()*10000);
        req.body.role = 'Manager';
        req.body.adminId = req.user.id;
        req.body.status = true;
        req.body.create_date = moment().format('LLL');
        req.body.update_date = moment().format('LLL');

        // console.log(req.body)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "krishnaskumbhani@gmail.com",
              pass: "knespzmdimxoenzy",
            },
          });

        const mail = `Email : ${req.body.email} <br/> PassWord : ${req.body.password}`

        const info = await transporter.sendMail({
        from: "krishnaskumbhani@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Manager Normal Data ✔", // Subject line
        text: "Manager Email and Password", // plain text body
        html: `<b>${mail}</b>`, // html body
        });

        if(info){
            let mandata = await Manager.create(req.body);
            if(mandata){
                return res.status(200).json({msg : "Manager Register Successfully && send Email",status : 1,data : mandata});
            }
            else{
                return res.status(200).json({msg : "Manager not Register SuccessFully !! send Email",status : 0});
            }
        }
        else{
            return res.status(400).json({msg : "Not send Email!!Something is worng",status : 0});
        }

    }
    catch(err){
        return res.status(400).json({msg : "Something is worng",status : 0,data:err});
    }
}

// ViewAllManager
module.exports.ViewAllManager = async(req,res)=>{
    try{
        var search = "";

        if (req.query.search) {
            search = req.query.search
        }


        var page = 0;
        var per_page = 2;

        if (req.query.page) {
            page = req.query.page;
        }

        const viewdata = await Manager.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        }).countDocuments();
        let totalpage = Math.ceil(viewdata / per_page);

        let ManagerAll = await Manager.find({
            $or : [ 
                {name : {$regex : search}},
                {email : {$regex : search}}
            ]
        }).skip(per_page * page)
        .limit(per_page)
        .find({status:true});

        
        if(ManagerAll){
            return res.status(200).json({msg : "All Manager Find Successfully && And Here",status : 1,data : ManagerAll,search: search,
            page : per_page,
            totalpage: totalpage,
            currentpage: page});
        }
        else{
            return res.status(400).json({msg : "All Manager Find Not Successfully !! Something Worng",status : 0});
        }
    }
    catch(err){
        return res.status(400).json({msg : "Something Worng",status : 0});
    }
}

// DeleteManager
module.exports.DeleteManager = async(req,res)=>{
    try{
        let deData = await Manager.findById(req.params.id);
        if(deData){
            let deleteData = await Manager.findByIdAndDelete(req.params.id);
            if(deleteData){
                return res.status(400).json({msg : "Record is Deleted Successfully && Record is Find",status : 1, data : deleteData});
            }
            else{
                return res.status(400).json({msg : "Record is Deleted Successfully && Record is Find !! Something Worng",status : 0});
            }
        }
        else{
            return res.status(400).json({msg : "Record is Not Find !! Something Worng",status : 0});
        }
    }
    catch(err){
        return res.status(400).json({msg : "Something Worng",status : 0});
    }
}

// ViewAllEmployee
module.exports.ViewAllEmployee = async(req,res)=>{
    try{
        var search = "" ;
        if(req.query.search){
            search = req.query.search;
        }
        console.log(req.query.search);

        var page = '';
        var per_page = 2;
        if(req.query.page){
            page = req.query.page
        }
        
        var emp = await  Employee.find({
            $or:[
                {name : {$regex : search}},
                {email : {$regex : search}},
            ]
        }).countDocuments();

        var totalpage = Math.ceil(emp/per_page);


        let empdata = await Employee.find({
            $or : [
                {name : {$regex:search}}
            ]
        })
        .skip(page*per_page)
        .limit(per_page)
        .find({status:true});

        if(empdata){
            return res.status(200).json({msg:"Employee Find && Data is Here",status: 1,record:empdata,search:search,totalpage:totalpage,page:per_page,currentPage:page});
        }
        else{
            return res.status(400).json({msg:"Employee Not Find !!Something Wrong",status: 0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something Wrong",status: 0});
    }
}