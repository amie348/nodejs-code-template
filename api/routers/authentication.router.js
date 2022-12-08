// importing required modules
const express = require(`express`);

// importing required middlewares
const { validateInput } = require(`../middlewares/input-validation.middleware`);

// importing required data validators
const { newUserSchema, userLoginSchema } = require(`../../dependencies/input-validation-schemas/user.schemas`);

// importing required controllers
const { addUser, loginUser } = require(`../controllers/authentication.controllers`);

// creating router
const authenticationRouter = express.Router();



// 1-> route to signup User
// 2-> route to login User 
authenticationRouter.post(`/signup`, validateInput(newUserSchema, `BODY`), addUser);
authenticationRouter.post(`/login`, validateInput(userLoginSchema, `BODY`), loginUser);



// exporting router as module
module.exports = {
  authenticationRouter
}