const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Teresafrancis1@',
        database: 'employee'
    },
    console.log('Connected to the work database.')
);

module.exports = db;