const Manager = require("../../../module/manager");
const jwt = require("jsonwebtoken");
const Employee = require("../../../module/Employee");
const moment = require("moment");
const nodemailer = require("nodemailer");

// ManagerLogin
module.exports.ManagerLogin = async (req,res)=>{
    try{
        console.log(req.body);
        let checkemail = await Manager.findOne({email : req.body.email});
        if(checkemail){
            console.log(checkemail.password)
            if(checkemail.password == req.body.password){
                let token = jwt.sign({ManagerData : checkemail},"ManagerProject",{expiresIn : '1h'});
                return res.status(200).json({msg : "Login SuccessFully && Email and Password Right",status : 1,data : token});
            }
            else{
                return res.status(400).json({msg : "Not Password !! Something Worng",status : 0});
            }
        }
        else{
            return res.status(400).json({msg : "Not Email !! Something Worng",status : 0});
        }
    }
    catch(err){
        return res.status(400).json({msg : "Something Worng",status : 0});
    }
}

// ManagerProfile
module.exports.ManagerProfile = async(req,res)=>{
    try{
        return res.status(200).json({msg : "Manager Profile",status :1,data : req.user})
    }
    catch(err){
        return res.status(400).json({msg : "Something Worng",status :0})
    }
}

// EditProfileManager
module.exports.EditProfileManager = async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.params.id);
        let update = await Manager.findById(req.params.id);
        if(update){
            let updatedata = await Manager.findByIdAndUpdate(req.params.id,req.body);
            if(updatedata){
                let updateManager = await Manager.findById(req.params.id);
                return res.status(400).json({json : "Record is Update SuccessFully && Record is Find",status :1 ,data : updateManager});
            }
            else{
                return res.status(400).json({json : "Record is Not Update && Record is Find !! Something Worng",status :0});
            }
        }
        else{
            return res.status(400).json({json : "Record is Not Find !! Something Worng",status :0});
        }
    }
    catch(err){
        return res.status(400).json({msg : "SOmething Worng",status :0});
    }
}

// EmployeeRegister
module.exports.EmployeeRegister = async(req,res)=>{
    try{
        let checkemail = await Employee.findOne({email : req.body.email});
        if(checkemail){
            return res.status(400).json({msg : "Email is Already Exit",status : 0});
        }
        else{
            req.body.password = req.body.name + "@" + Math.round(Math.random()*10000);
        req.body.role = 'Emplyoee';
        req.body.status = true;
        req.body.create_date = moment().format('LLL');
        req.body.update_date = moment().format('LLL');
        req.body.ManagerId = req.user.id;

        console.log(req.body)

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
        subject: "Employee Normal Data ✔", // Subject line
        text: "Employee Email and Password", // plain text body
        html: `<b>${mail}</b>`, // html body
        });


        if(info){
            let mandata = await Employee.create(req.body);
            if(mandata){
                return res.status(200).json({msg : "Employee Register Successfully && send Email",status : 1,data : mandata});
            }
            else{
                return res.status(200).json({msg : "Employee not Register SuccessFully !! send Email",status : 0});
            }
        }
        else{
            return res.status(400).json({msg : "Not send Email!!Something is worng",status : 0});
        }
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something worng",status : 0,data:err});
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
        
        var emp = await Employee.find({
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

// DeleteEmployee
module.exports.DeleteEmployee = async(req,res)=>{
    try{
        let deData = await Employee.findById(req.params.id);
        if(deData){
            let deleteData = await Employee.findByIdAndDelete(req.params.id);
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