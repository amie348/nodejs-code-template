//importing required packages
const bcrypt = require(`bcryptjs`);

//importing required console warnings
const { logWarning, logError } = require(`../helpers/console.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, NOT_FOUND, CONFLICT, SERVER_ERROR, UNAUTHORIZED } } = require(`../config`);

//importing required data helpers
const { hashPassword, generateToken } = require(`../helpers/mongoose.helpers`);

// requiring required schemas
const User = require(`../../api/models/user.model`);



// this data service takes in user data obj and _creator, saves user in
// the local database and returns response to its caller
const signupUser = async (userData) => {

  try {

    const { password } = userData;

    // convert simple password into hash form
    const hashedPassword = await hashPassword(password);

    let userObj = {

      ...userData,
      password: hashedPassword

    }

    // creating an object to store new user
    const user = new User({

      ...userObj

    });

    // saving new user in the database
    const result = await user.save();

    // returning saved user to its caller
    return {

      status: CREATED,
      data: result._id

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ signupUser -> authentication.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    // const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `User creation failed due to duplicate ${duplicateErrorFields}.` : `Unhandled exception occurred on the server.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

//This controller takes in user email and
//password and login user and generate auth token
const userSignIn = async (loginData) => {

  try {

    // fetching required data from incoming object
    const { email, password } = loginData;

    // find specific user from database
    const user = await User.findOne({ email });
    console.log(user)

    // checking user email and password is corrct or NOT
    if (user && (await bcrypt.compare(password, user.password))) {

      const token = await generateToken(user._id);

      // returning response to its caller
      return {

        status: SUCCESS,
        data: {

          name: user.firstName,
          email: user.email,
          token: token

        }

      }

    } else {
      // this condition runs when email or password or both are incorrect

      // returning response to its caller
      return {

        status: UNAUTHORIZED,
        error: 'Invalid Credentials'

      }

    }

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ userSignIn -> authentication.services.js`, error);

    // return error to its caller
    return {

      status: SERVER_ERROR,
      error: error

    }

  }

};



// exporting service as a module
module.exports = {

  signupUser,
  userSignIn

}