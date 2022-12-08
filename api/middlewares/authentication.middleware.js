//importing required packages
const jwt = require(`jsonwebtoken`);

//requiring required model

//importing required credentials
const { JWT_SECRET } = require(`../../dependencies/credentials`);

// importing required packages and modules
const { logInfo, logError } = require(`../../dependencies/helpers/console.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { UNAUTHORIZED, SERVER_ERROR } } = require(`../../dependencies/config`);



//this middleware authenticates incoming request 
//check customer is authorize or not
const authenticateRequest = async (req, res, next) => {

  try {

    let token;

    //checking if the authorization headers exists
    if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {

      //get token from requested headers
      token = req.headers.authorization.split(' ')[1];

      //decode the token for employee verification
      const decoded = jwt.verify(token, JWT_SECRET);

      //get data of requested employee
      req.user = await Customer.findById(decoded.id).select('-password');

      //pass the request to next operation
      next();

    } else {

      // logging error message to the console
      logError(`Authoirzation headers not found. Authentication failed.`);

      // returning the response with an error message
      return res.status(UNAUTHORIZED).json({

        hasError: true,
        message: `ERROR: Requested Operation Failed.`,
        error: {

          error: `Authorization headers not found. Authentication failed.`

        }

      });
    }

  } catch (error) {
    // this code runs in case of an ERROR @ runtime

    // logging error messages to the console
    logError(`ERROR @ authenticateRequest -> app-auth.middleware.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested Operation Failed.`,
      error: {

        error

      }

    });
  }

};



//exports middleware as module
module.exports = {

  authenticateRequest

}