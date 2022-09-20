const mysql = require("mysql");
if (process.env.NODE_ENV.trim() === "dev") {
    require('dotenv').config();
}

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

con.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

con.query("create database if not exists new_web_database", (err, result, fields) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
});


con.end();