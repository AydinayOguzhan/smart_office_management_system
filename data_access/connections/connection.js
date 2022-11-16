const mysql = require("mysql");
const Messages = require("../../core/utilities/constants/messages");
const ErrorResult = require("../../core/utilities/results/error_result");
require('dotenv').config()


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// const connection = mysql.createConnection({
//     host: process.env.PROD_HOST,
//     user: process.env.PROD_USER,
//     password: process.env.PROD_PASSWORD,
//     database: process.env.PROD_DATABASE
// });



connection.connect((err) => {
    if (err) return new ErrorResult(Messages.databaseConnectionError);
    console.log("Connected");
});

module.exports = connection;