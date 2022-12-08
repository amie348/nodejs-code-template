// importing required packages and modules
const { logInfo, logError } = require(`../../dependencies/helpers/console.helpers`);

// importing response status codes
const { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, SERVER_ERROR } = require(`../../dependencies/config`).HTTP_STATUS_CODES;



// this function will be added as a middleware to check for the JSON web token
// and authenticate users
const grantAccessTo = (inputArrayOfRoles) => {

  // creating a method which grants access based on the requestee's system role
  const accessGranter = (req, res, next) => {

    // fetching required data from incoming token data
    const { _id, bearerPermissions, accountStatus } = req.tokenData;

    // checking if the token bearer's account is active
    if (accountStatus.toUpperCase() === `DISABLED`) {
      // this code runs in case the user's account status is not disabled

      // logging error message to the console
      logError(`Authorization failed. Your account is disabled. Contact system admin.`);

      // returning the response with an error message
      return res.status(FORBIDDEN).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error: `ERROR: Authorization failed. Your account is disabled. Contact system admin`

        }

      });

    }

    // validating incoming systems roles
    if (!inputArrayOfRoles || !Array.isArray(inputArrayOfRoles)) {
      // this code runs in case incoming field has invalid data

      // logging error message to the console
      logError(`ERROR @ grantAccessTo -> grant.access.middleware.js.`);

      // returning the response with an error message
      return res.status(SERVER_ERROR).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error: `ERROR: Invalid value for 'inputArrayOfRoles'.`

        }

      });

    }

    // checking if the user is superAdmin
    const isSuperUser = (bearerPermissions.includes(`super-admin:*`)) ? true : false;

    // checking if the user is authorized or not
    if (isSuperUser) {

      // set user role in token data
      if (isSuperUser) {

        req.tokenData['role'] = 'super-admin'

      } else {

        req.tokenData['role'] = 'user'

      }

      // forwarding the request to the next handler
      next();

    } else {
      // this code runs in case requestee is not authorized to access the
      // requested resource (endpoint)

      // logging error message to the console
      logError(`Authorization failed. You're not authorized to access this resource.`);

      // returning the response with an error message
      return res.status(FORBIDDEN).json({

        hasError: true,
        message: `ERROR: Requested operation failed.`,
        error: {

          error: `ERROR: Authorization failed. Not authorized to access this resource.`

        }

      });

    }

  }

  // returning the function upon invocation by the router
  return accessGranter;

}



// exporting as a module
module.exports = {

  grantAccessTo

};