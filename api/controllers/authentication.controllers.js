// importing required packages and modules
const { logWarning, logError } = require(`../../dependencies/helpers/console.helpers`);

// importing required data services
const { signupUser, userSignIn } = require(`../../dependencies/internal-services/authentication.services`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR, UNAUTHORIZED } } = require(`../../dependencies/config`);



// this controller takes data via incoming request body and creates a new
// user in the database.
const addUser = async (req, res, next) => {

  try {

    // calling data service to save new user in the database
    const { status, data, error } = await signupUser(req.body);

    // checking the result of the operation
    if (status === SERVER_ERROR) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      logError(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    } else if (status === CONFLICT) {
      // this code runs in case data service failed due to duplicate values

      // logging error message to the console
      logError(`Requested operation failed. User with duplicate field(s) exists.`);

      // returning the response with an error message
      return res.status(CONFLICT).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    }

    // returning the response with success message
    return res.status(CREATED).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        user: data

      }

    });

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ addUser -> authentication.controllers.js`, error);

    // returning response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `Unhandled exception occurred on the server.`

      }

    });

  }

}

//this controller takes login credentials from user and check
//credential to login 
const loginUser = async (req, res, next) => {

  try {

    const { status, data, error } = await userSignIn(req.body);

    if (status === SERVER_ERROR) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      logError(`Requested operation failed. Unknown database error.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });

    } else if (status === UNAUTHORIZED) {
      // this code runs in case data service failed due to unknown database
      // error

      // logging error message to the console
      logError(`Requested operation failed. Employee UNAUTHORIZED.`);

      // returning the response with an error message
      return res.status(UNAUTHORIZED).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error

        }

      });
    }

    // returning the response with success message
    return res.status(SUCCESS).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        user: data

      }

    });
  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console  
    logError(`ERROR @ loginUser -> authentication.controllers.js`, error);

    // returning response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `Unhandled exception occurred on the server.`

      }

    });

  }

};



// exporting controller as module
module.exports = {

  addUser,
  loginUser

}