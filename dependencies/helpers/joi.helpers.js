// importing required packages and modules
const { DateTime } = require(`luxon`);
const { isValidObjectId } = require(`mongoose`);
const isValidBase64 = require(`validator/lib/isBase64`);

// importing required config params
const { ALLOWED_INCOMING_FILE_TYPES } = require(`../config`);



// custom validator for incoming objectId value
const objectIdValidation = (value, helpers) => {

  // validating incoming value
  if (!isValidObjectId(value)) {
    // this code runs in case incoming value is not a valid object id

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.invalid`);

  }

  // returning incoming value if it is valid
  return value;

};

// custom validator for incoming phone number value
const validatePhoneNo = (value, helpers) => {

  // cleaning the incoming value of formatting chars
  const cleanPhoneNo = value.replace(/[^0-9]/g, ``);

  // checking and appending international code if neccessary
  const formattedPhone = cleanPhoneNo.length === 10 ? `+1`.concat(cleanPhoneNo) : `+`.concat(cleanPhoneNo);

  // creating regex pattern to validate phone number
  const regex = new RegExp(`^[+1]{2}[0-9]{10}`);

  // // validating incoming value's metadata
  if (!regex.test(formattedPhone)) {
    // this code runs in case incoming start date is greater than end date

    // storing custom error
    const error = new Error(`it is not a valid phone number.`);

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.custom`, { error });

  }

  // returning incoming value if it is valid
  return formattedPhone;

};

// custom validator for incoming base64 value
const base64Validation = (value, helpers) => {

  // fetching metadata and data from incoming value
  const [metaData, data] = value.split(`,`);

  // 1-> initializing an variable to check if metadata is valid
  // 2-> initializing an variable to check if incoming file type is valid
  const [hasValidMetaData, hasValidFileType] = [metaData.startsWith(`data:`), ALLOWED_INCOMING_FILE_TYPES.some(type => metaData.includes(type))];

  // validating incoming value's metadata
  if (!hasValidMetaData) {
    // this code runs in case incoming base64 string metadata was not available

    // storing custom error
    const error = new Error(`it doesn't have valid base64 metadata.`);

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.custom`, { error });

  } else if (!hasValidFileType) {
    // this code runs in case incoming file type is not valid

    // storing custom error
    const error = new Error(`it is not 'jpg', 'jpeg' 'png' or 'pdf' file.`);

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.custom`, { error });

  }

  // validating incoming value
  if (!isValidBase64(data)) {
    // this code runs in case incoming value is not a valid value

    // storing custom error
    const error = new Error(`it is not a valid base64 encoded string.`);

    // returning with an error indicating that incoming value is invalid
    return helpers.error(`any.custom`, { error });

  }

  // returning incoming value if it is valid
  return value;

};

// custom validator for incoming stringified JSON objects
const jsonObjValidation = (value, helpers) => {

  try {

    // parsing and storing incoming JSON value
    value = JSON.parse(value);

    // checking if incoming value is valid
    if ((!!value) && value.constructor !== Object) {
      // this code runs in case incoming value is not an object

      // storing custom error
      const error = new Error(`it is not valid stringified JSON object.`);

      // returning with an error indicating that incoming value is invalid JSON
      return helpers.error(`any.custom`, { error });

    } else if (!Object.keys(value).includes(`query`)) {
      // this code runs in case incoming obj doesn't have 'query' key

      // storing custom error
      const error = new Error(`it is missing 'query' field.`);

      // returning with an error indicating that incoming value is invalid JSON
      return helpers.error(`any.custom`, { error });

    }

  } catch (err) {
    // this code runs in case value could not be parsed as JSON

    // storing custom error
    const error = new Error(`it is not valid JSON.`);

    // returning with an error indicating that incoming value is invalid JSON
    return helpers.error(`any.custom`, { error });

  }

  // returning incoming value if it is valid
  return value;

};

// custom validator for incoming stringified JSON objects
const emptyObjectValidation = (value, helpers) => {

  // checking if incoming value is valid
  if (!Object.keys(value).length) {
    // this code runs in case incoming obj is empty

    // storing custom error
    const error = new Error(`it can't be empty.`);

    // returning with an error indicating empty object
    return helpers.error(`any.custom`, { error });

  }

  // returning incoming value if it is valid
  return value;

};

// custom validator for incoming year validation
const yearValidation = (value, helpers) => {

  // calculating current year value
  const currentYear = DateTime.now().year;

  // checking if incoming value is valid
  if (isNaN(value)) {
    // this code runs in case incoming value is not a number

    // storing custom error
    const error = new Error(`it is not a numeric value.`);

    // returning with an error indicating empty object
    return helpers.error(`any.custom`, { error });

  } else if (parseInt(value) > currentYear) {
    // this code runs in case incoming value is greater than current year

    // storing custom error
    const error = new Error(`it is greater than ${currentYear}.`);

    // returning with an error indicating empty object
    return helpers.error(`any.custom`, { error });

  }

  // returning incoming value if it is valid
  return value;

};



// exporting validation helpers as modules
module.exports = {

  objectIdValidation,
  validatePhoneNo,
  base64Validation,
  jsonObjValidation,
  emptyObjectValidation,
  yearValidation

};