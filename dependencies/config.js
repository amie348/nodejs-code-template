// importing required data dependencies
// const { DB_USERNAME, DB_PASSWORD } = require(`dependencies/credentials`);

// setting allowed app modes
const ALLOWED_APP_MODES = [`DEV`, `STAGE`, `PROD`];

// fetching app mode from environment
const APP_MODE = process.env.APP_MODE && ALLOWED_APP_MODES.includes(process.env.APP_MODE) ? process.env.APP_MODE : `DEV`;



// exporting config params as module
module.exports = {

  APP_MODE,

  NODE_PORT: 8000,

  MONGO_ATLAS_CONNECTION_URI: `mongodb+srv://faraz:faraz@cluster0.qd3vteh.mongodb.net/test`,

  ALLOWED_APP_MODES,

  ALLOWED_MARITAL_STATUSES: [`SINGLE`, `SEPARATED`, `MARRIED`, `DIVORCED`, `WIDOWED`, `COMPLICATED`],

  ALLOWED_GENDERS: [`MALE`, `FEMALE`, `NON_BINARY`],

  ALLOWED_CUSTOM_ID_LENGTH: 8,

  ALLOWED_CUSTOMER_PREFERRED_LANGUAGES: [`ENGLISH`, `SPANISH`, `GERMAN`, `FRENCH`, `POLISH`, `KOREAN`, `URDU`, `RUSSIAN`, `HINDI`, `CHINESE`],

  HTTP_STATUS_CODES: {

    SUCCESS: 200,

    CREATED: 201,

    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    CONFLICT: 409,

    SERVER_ERROR: 500

  },

  ALLOWED_VALIDATION_SCHEMA_SCOPES: {

    BODY: `BODY`,

    PARAMS: `PARAMS`,

    QUERY: `QUERY`,

    NONE: `NONE`

  },

  DEFAULT_RECORDS_PER_PAGE: 50,

  ALLOWED_MIN_PASSWORD_LENGTH: 8,

  MAX_FILE_SIZE_ALLOWED_BYTES: 1024 * 1024 * 10,

  ALLOWED_INCOMING_FILE_TYPES: [`jpg`, `jpeg`, `png`, `pdf`, `mp3`],

  JWT_EXPIRY_IN_SECONDS: 2592000, // 30 Days

  CUSTOM_ID_BASE_VALUE: 1000,

  CUSTOM_ID_PREFIX_CHARS: 2,

  USER_ID_PREFIX: `US`,

};