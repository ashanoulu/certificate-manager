const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST, // 'mysql-host'
    user: process.env.DB_USER, //'mysql-user'
    password: process.env.DB_PASSWORD, // 'mysql-password'
    database: process.env.DB_NAME, // 'mysql-database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
});


module.exports = connection;
