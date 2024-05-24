const express = require("express");

const port = 8001;

const app = express();

app.use(express.urlencoded());

// install pakeage
const passport = require("passport");
const session = require("express-session");


// File
const db = require("./config/mongoose");
const passportjwt = require("./config/passport-jwt");


app.use(session({
    name : "adminpanel",
    secret : "project",
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 1000*60*60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/",require("./routes/api/v1"));

app.listen(port,(err)=>{
    if(err) console.log(err);

    console.log("server is running on port : " , port);
})
