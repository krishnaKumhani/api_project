const passport = require("passport");

const JwtStrategy = require('passport-jwt').Strategy;

const JwtExtract = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest : JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : "project"
};

const Admin = require("../module/admin");

passport.use(new JwtStrategy(opts,async (payload,done)=>{
    let AdData = await Admin.findById(payload.Admindata._id);
    if(AdData){
        return done(null, AdData);
    }
    else{
        return done(null,false);
    }
}));

const optsman = {
    jwtFromRequest : JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : "ManagerProject"
}

const Manager = require("../module/manager");

passport.use("managerjwt",new JwtStrategy(optsman,async (payload,done)=>{
    let manData = await Manager.findById(payload.ManagerData._id);
    if(manData){
        return done(null, manData);
    }
    else{
        return done(null,false);
    }
}));

const optsEmp = {
    jwtFromRequest : JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : "EmployeeProject"
}

const Employee = require("../module/Employee");

passport.use("Employeejwt",new JwtStrategy(optsEmp,async (payload,done)=>{
    let empData = await Employee.findById(payload.Employeedata._id);
    if(empData){
        return done(null, empData);
    }
    else{
        return done(null,false);
    }
}));

passport.serializeUser(async(user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    let AdData = await Admin.findById(id);
    if(AdData){
        return done(null,AdData);
    }
    else{
        return done(null,false);
    }
});

console.log("passport jwt config");

module.exports = passport;