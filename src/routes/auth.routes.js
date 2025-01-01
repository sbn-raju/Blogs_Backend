const express = require("express");
const {login, register} = require("../controllers/auth.controllers.js");


const authRouter = express();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);


module.exports = authRouter