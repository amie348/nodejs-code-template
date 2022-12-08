//importing required console warnings
const { logWarning, logError } = require(`../helpers/console.helpers`);

// importing required config params
const { HTTP_STATUS_CODES: { SUCCESS, CREATED, NOT_FOUND, CONFLICT, SERVER_ERROR, UNAUTHORIZED } } = require(`../config`);

// requiring required schemas
const User = require(`../../api/models/user.model`);



// this data service takes in query scope, fetches all users stored in the
// database and returns it
const findUsers = async (queryScope) => {

  try {

    // querying database for all employees
    const result = await User.find().sort({ createdAt: -1 }).select(queryScope).lean().exec();

    // returning saved users to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findUsers -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

// this data service takes in user id and query scope, fetch user
// stored in the database
const findUserById = async (userId, queryScope) => {

  try {

    // querying database for the requested employee
    const result = await User.findOne({ _id: userId }).select(queryScope).lean().exec();

    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };


    }

    // returning fetched data to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findUserById -> user.services.js`, error);

    // returning 'SERVER_ERROR' to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: `Unhandled exception occured on the server.`

    };

  }

}

// this data service takes in user id, update data object and query scope,
// updates user stored in the database according to the provided params
// and returns the updated employee.
const findUserByIdAndUpdate = async (userId, updateData, queryScope) => {

  try {

    // creating an obj to store query config params
    const configParams = {

      new: true,
      runValidators: true

    };

    // querying database for the requested user
    const result = await User.findOneAndUpdate({ _id: userId }, updateData, configParams).select(queryScope).lean().exec();


    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };

    }

    // returning fetched data to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findUserByIdAndUpdate -> user.services.js`, error);

    // checking if the error stems from duplicate value in database
    const isDuplicateError = error && error.code === 11000;

    // fetching fields which caused duplication error
    const duplicateErrorFields = (Object.keys(error.keyValue)).join(`, `);

    // setting value of status and description
    const [status, err] = [isDuplicateError ? CONFLICT : SERVER_ERROR, isDuplicateError ? `Update failed due to duplicate ${duplicateErrorFields}.` : `Unhandled exception occurred on the server.`];

    // returning response to indicate failure to its caller
    return {

      status,
      error: err

    };

  }

}

// this data service takes in user id, 
// soft delete user stored in the database according to the provided params
// and returns empty obj
const findUserByIdAndDelete = async (userId) => {

  try {

    // creating an obj to store query config params
    const configParams = {

      new: true,
      runValidators: true

    };

    // querying database for the requested user
    const result = await User.findOneAndUpdate({ _id: userId }, { isDeleted: true }).lean().exec();


    // checking the result of the query
    if (!result) {
      // this code runs in case query didn't return anything from database

      return {

        status: NOT_FOUND,
        error: `Requested data not found in database.`

      };

    }

    // returning fetched data to its caller
    return {

      status: SUCCESS,
      data: result

    };

  } catch (error) {
    // this code runs in case of an error @ runtime

    // loggine error messages to the console
    logError(`ERROR @ findUserByIdAndDelete -> user.services.js`, error);

    // returning response to indicate failure to its caller
    return {

      status: SERVER_ERROR,
      error: err

    };

  }

}



// exporting services as module
module.exports = {

  findUsers,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete

}