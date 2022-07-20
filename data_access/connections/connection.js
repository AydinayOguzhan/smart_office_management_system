const mysql = require("mysql");
const Messages = require("../../core/utilities/constants/messages");
const ErrorResult = require("../../core/utilities/results/error_result");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"deu"
});

connection.connect((err)=>{
    if(err) return new ErrorResult(Messages.databaseConnectionError);
    console.log("Connected");
});

module.exports = connection;