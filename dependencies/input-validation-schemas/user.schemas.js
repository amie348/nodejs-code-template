// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation, validatePhoneNo, base64Validation, jsonObjValidation } = require(`../helpers/joi.helpers`);




// defining valdiation schema to add a user
const newUserSchema = Joi.object({

  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.object({

    unitNo: Joi.string().min(1),
    street: Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
    zip: Joi.array().min(1).required(),
    state: Joi.string(),

  }).required()

});

// defining valdiation schema for specific User
const specificUserSchema = Joi.object({

  userId: Joi.string().custom(objectIdValidation, `User ID Validation`).required(),

});

// defining valdiation schema to update a user
const updateUserSchema = Joi.object({

  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().custom(validatePhoneNo, `Phone Validation`),
  address: Joi.object({

    unitNo: Joi.string().min(1),
    street: Joi.string().min(1),
    city: Joi.string().min(1),
    zip: Joi.array().min(1),
    state: Joi.string(),

  })

});

// defining valdiation schema to login a user
const userLoginSchema = Joi.object({

  email: Joi.string().email().required(),
  password: Joi.string().required(),

});



// exporting schemas as modules
module.exports = {

  newUserSchema,
  specificUserSchema,
  updateUserSchema,
  userLoginSchema

};