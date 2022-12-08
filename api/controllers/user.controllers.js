// importing required packages and modules
const { logWarning, logError } = require(`../../dependencies/helpers/console.helpers`);

// importing required data services
const { findUsers, findUserById, findUserByIdAndUpdate, findUserByIdAndDelete } = require(`../../dependencies/internal-services/user.services`);

// importing response status codes
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT, SERVER_ERROR, UNAUTHORIZED } } = require(`../../dependencies/config`);



// this controller returns all users stored in the database as an array
const getAllUsers = async (req, res, next) => {

  try {

    // calling data service to fetch all employees from database
    const { status, data, error } = await findUsers(`-__v `);

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

    }

    // returning the response with success message
    return res.status(SUCCESS).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {

        totalUsers: data.length,
        users: data

      }

    });

  } catch (error) {
    // this code runs in case of an error @ runtime

    // logging error messages to the console
    logError(`ERROR @ getAllUsers -> user.controllers.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `Unhandled exception occurred on the server.`

      }

    });

  }

}

// this controller takes in user id via path params, searches database for
// the requested user and returns it
const fetchSpecificUser = async (req, res, next) => {

  try {

    // fetching required data via path params of url
    const { userId } = req.params;

    // calling data service to fetching requested employee from database
    const { status, data, error } = await findUserById(userId, `-__v`);

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

    } else if (status === NOT_FOUND) {
      // this code runs in case data service could not find the requested
      // resource

      // logging error message to the console
      logError(`Requested operation failed. Employee not found.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

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
    logError(`ERROR @ fetchSpecificUser -> user.controllers.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `Unhandled exception occurred on the server.`

      }

    });

  }

}

// this controller takes in user id via path params, searches database for
// the requested user and updates it
const updateUser = async (req, res, next) => {

  try {

    // fetching required data via incoming path params of url
    const { userId } = req.params;

    // calling data service to update requested employee in the database
    const { status, data, error } = await findUserByIdAndUpdate(userId, req.body, `-__v`);

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

    } else if (status === NOT_FOUND) {
      // this code runs in case data service could not find the requested
      // resource

      // logging error message to the console
      logError(`Requested operation failed. User not found.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: `ERROR: Requested operation failed. System role not found.`,
        error: {

          error

        }

      });

    } else if (status === CONFLICT) {
      // this code runs in case data service could not find the requested
      // resource

      // logging error message to the console
      logError(`Requested operation failed. Duplicate Data.`);

      // returning the response with an error message
      return res.status(CONFLICT).json({

        hasError: true,
        message: `ERROR: Requested operation failed. Duplication in Data.`,
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
    logError(`ERROR @ updateUser -> user.controllers.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `Unhandled exception occurred on the server.`

      }

    });

  }

}

// this controller takes in user id via path params, searches database for
// the requested user and soft delete User 
const deleteUserById = async (req, res, next) => {

  try {

    // fetching required data via incoming path params of url
    const { userId } = req.params;

    // calling data service to update requested employee in the database
    const { status, data, error } = await findUserByIdAndDelete(userId);

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

    } else if (status === NOT_FOUND) {
      // this code runs in case data service could not find the requested
      // resource

      // logging error message to the console
      logError(`Requested operation failed. User not found.`);

      // returning the response with an error message
      return res.status(NOT_FOUND).json({

        hasError: true,
        message: `ERROR: Requested operation failed. System role not found.`,
        error: {

          error

        }

      });

    } else if (status === CONFLICT) {
      // this code runs in case data service could not find the requested
      // resource

      // logging error message to the console
      logError(`Requested operation failed. Duplicate Data.`);

      // returning the response with an error message
      return res.status(CONFLICT).json({

        hasError: true,
        message: `ERROR: Requested operation failed. Duplication in Data.`,
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
    logError(`ERROR @ deleteUserById -> user.controllers.js`, error);

    // returning the response with an error message
    return res.status(SERVER_ERROR).json({

      hasError: true,
      message: `ERROR: Requested operation failed.`,
      error: {

        error: `Unhandled exception occurred on the server.`

      }

    });

  }

}



// exporting controller as module
module.exports = {
  getAllUsers,
  fetchSpecificUser,
  updateUser,
  deleteUserById
}