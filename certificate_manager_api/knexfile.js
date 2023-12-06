require('dotenv').config();

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './db/certificate_manager.sqlite',
        },
        useNullAsDefault: true,
        // client: 'mysql',
        // connection: {
        //     host: process.env.DB_HOST,
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     database: process.env.DB_NAME,
        //     port: 3306,
        //     charset: 'utf8',
        // },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
    },
};
