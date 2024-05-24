const Employee = require("../../../module/Employee");
const jwt = require("jsonwebtoken");

// EmplyoeeLogin
module.exports.EmplyoeeLogin = async(req,res)=>{
    try{
        let checkemail = await Employee.findOne({email:req.body.email});
        if(checkemail){
            if(checkemail.password == req.body.password){
                let token = jwt.sign({Employeedata : checkemail},"EmployeeProject",{expiresIn:'1h'});
                return res.status(200).json({msg:"Your Login Is SuccessFully && Token Here",status:1,record : token});
            }
            else{
                return res.status(400).json({msg:"Password isn't Find !! Something Worng",status:0});
            }
        }
        else{
            return res.status(400).json({msg:"Email isn't Find !! Something Worng",status:0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something Worng",status:0});
    }
}

// EmployeeProfile
module.exports.EmployeeProfile = async(req,res)=>{
    try{
        return res.status(200).json({msg:"Your Profile Here",status:1,Record : req.user});
    }
    catch(err){
        return res.status(400).json({msg:"Something Wrong",status:0});
    }
}