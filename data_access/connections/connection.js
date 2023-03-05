const Messages = require("../../core/utilities/constants/messages");
const ErrorResult = require("../../core/utilities/results/error_result");
require('dotenv').config()
//postgresql
const { Client } = require("pg");

const connection = new Client({
    user:process.env.POSTGRES_USER,
    host:process.env.POSTGRES_HOST,
    database:process.env.POSTGRES_DATABASE,
    password:process.env.POSTGRES_PASSWORD,
    port:process.env.POSTGRES_POST
})


connection.connect((err) => {
    if (err) return new ErrorResult(Messages.databaseConnectionError);
    console.log("Connected");
});

module.exports = connection;