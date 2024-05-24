const express = require("express");

const routs = express.Router();

routs.use("/admin",require("./Admin"))

routs.use("/manager",require("./Manager"));

routs.use("/employee",require("./Employee"));

console.log("Index Routing");

module.exports = routs;