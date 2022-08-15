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

connection.connect((err)=>{
    if(err) return new ErrorResult(Messages.databaseConnectionError);
    console.log("Connected");
});

module.exports = connection;