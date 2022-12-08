// importing required modules
const express = require(`express`);

// importing required middlewares
const { authenticateRequest } = require(`api/middlewares/authentication.middleware`);
const { validateInput } = require(`api/middlewares/input-validation.middleware`);

// importing required schemas
const { specificUserSchema, updateUserSchema } = require(`../../dependencies/input-validation-schemas/user.schemas`);

// importing required controllers
const { getAllUsers, fetchSpecificUser, updateUser, deleteUserById } = require(`../controllers/user.controllers`);



// initting user router
const userRouter = express.Router();




// 1-> route to get all users from veronicas database
// 2-> route to fetch a specific user from database via _id
userRouter.get(`/all`, getAllUsers);
userRouter.get(`/:userId`, validateInput(specificUserSchema, `PARAMS`), fetchSpecificUser);

// route to update specific user
userRouter.patch(`/:userId`, validateInput(updateUserSchema, `BODY`), updateUser);

// 1-> route to delete a specific user from database via _id
userRouter.delete(`/:userId`, validateInput(specificUserSchema, `PARAMS`), deleteUserById);



// exporting router as module
module.exports = {

  userRouter

};