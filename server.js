// importing required packages and modules
const cors = require(`cors`);
const express = require(`express`);
const http = require('http');
const morgan = require(`morgan`);

// importing required helpers
const { logSuccess, logInfo, logWarning, logError } = require(`./dependencies/helpers/console.helpers`);
const { connectDatabase, disconnectDatabase } = require(`./dependencies/helpers/database.helpers`);

// importing required config params
const { APP_MODE, NODE_PORT, MAX_FILE_SIZE_ALLOWED_BYTES, CARRIER_DOWNLOADS_CRON_EXPRESSION, PENDING_INSTALLMENTS_CRON_EXPRESSION, HTTP_STATUS_CODES: { SUCCESS } } = require(`./dependencies/config`);

// importing required routers
const { authenticationRouter } = require(`./api/routers/authentication.router`);
const { userRouter } = require(`./api/routers/user.router`);


// creating an instance of express server
const app = express();

// creating an instance of http server and pass it to socketsHandler
const server = http.createServer(app);



// initializing server
(async () => {

  try {

    // Listening requests on the specified PORT
    server.listen(process.env.PORT || NODE_PORT, logInfo(`Initializing server in ${APP_MODE} mode. Please wait.`));

    // 1-> middleware for handling cors
    // 2-> middleware to log requests to the console
    // 3-> middleware to parse json request body
    // 4-> middleware to parse urlencoded request data
    // app.use(cors());
    app.use(function (req, res, next) {
      // res.setHeader(`Access-Control-Allow-Origin`, `*`);
      // res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);
      // res.setHeader(`Access-Control-Allow-Headers`, `Content-Type`);
      // res.setHeader(`Access-Control-Allow-Credentials`, true);
      // next();
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, franchiseId, locationId');
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
        return res.status(200).json({ res: "Successful" });
      }
      next()
    });
    app.use(morgan(`dev`));
    app.use(express.json({
      limit: '50mb'
    }));
    app.use(express.urlencoded({
      limit: '50mb',
      parameterLimit: 100000,
      extended: true
    }));



    // api handlers
    app.use(`/api/auth`, authenticationRouter);
    app.use(`/api/user`, userRouter)


    // creating test route
    app.get(`/`, (req, res, next) => res.status(SUCCESS).send(`|| Service is UP & RUNNING in ${APP_MODE} mode ||`));



    // making connection to database
    await connectDatabase();

    // logging message to the console
    logInfo(`Server is running @ port ${NODE_PORT}.`);


    // calling miration function 
    // migrate()

  } catch (error) {
    // this code runs in case of an ERROR @ runtime

    // logging error message to the console
    logError(`ERROR @ Server Initialization Process.`, error);

  }

})();



// disconnecting from the database instance before killing the process
process.on(`SIGINT`, async () => {

  // disconnecting server from database
  await disconnectDatabase();

});