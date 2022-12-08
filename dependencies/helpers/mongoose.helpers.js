// importing required modules
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

// importing required log modules
const { logInfo, logSuccess, logWarning, logError } = require(`./console.helpers`);

//importing required credentials
const { JWT_SECRET } = require(`../credentials`);



// this helper takes in phone number and cleans it of formatting characters
const cleanPhoneNo = (rawPhoneNo) => {

  try {

    // cleaning the raw phone number value
    return rawPhoneNo.replace(/[^0-9+]/g, ``);

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ cleanPhoneNo -> common.helpers.js`, error);

    // throwing exception
    throw error;

  }

}

// this helper hashes password string and returns it
const hashPassword = (v) => {

  try {

    // generating and returning hashed password
    return v ? bcrypt.hashSync(v) : null;

  } catch (error) {
    // this code runs in case of an ERROR @ runtime

    // logging error messages to the console
    logError(`ERROR @ hashPassword -> mongoose.helpers.js`, error);

  }

}

// this data helper generate token on user login
const generateToken = (id) => {

  return jwt.sign({ id },

    JWT_SECRET,

    { expiresIn: `3600s` }

  );

}



// exporting helpers as modules
module.exports = {

  cleanPhoneNo,
  hashPassword,
  generateToken

};