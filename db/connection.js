const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'password',
        database: 'employee',
        port: 3306
    },
    console.log('Connected to the work database.')
);

module.exports = db;