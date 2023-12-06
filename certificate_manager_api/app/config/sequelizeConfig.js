const { Sequelize } = require('sequelize');
require('dotenv').config();

/*
## MYSQL DATABASES
 */
// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     host: process.env.DB_HOST || 'localhost',
//     username: process.env.DB_USER || 'admin',
//     password: process.env.DB_PASSWORD || 'admin',
//     database: process.env.DB_NAME || 'certificate_manager',
// });

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/certificate_manager.sqlite', //  ':memory:' for in-memory database and change knexfile.js
});

module.exports = sequelize;
