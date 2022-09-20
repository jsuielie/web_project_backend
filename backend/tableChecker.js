const mysql = require("mysql");
if (process.env.NODE_ENV.trim() === "dev") {
    require('dotenv').config();
}

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

con.query(`create table if not exists users (
    provider varchar(255) not null,
    userId varchar(255) not null,
    lastName varchar(255),
    firstName varchar(255),
    createTime dateTime default current_timestamp,
    imageUrl varchar(2083),
    displayName varchar(255),
    passwordHash varchar(255),
    primary key (userId)
)`, (err, result, fields) => {
    if (err) {
        console.error('User table creation failed: ' + err.stack);
        return;
    }
})


con.query(`create table if not exists board (
    boardId bigint unsigned not null auto_increment,
    title varchar(255) not null,
    createTime dateTime default current_timestamp,
    userId varchar(255) not null,
    primary key (boardId)
)`, (err, result, fields) => {
    if (err) {
        console.error('Board table creation failed: ' + err.stack);
        return;
    }
})

con.query(`create table if not exists card (
    cardId int not null auto_increment,
    message varchar(255) not null,
    createTime dateTime default current_timestamp,
    imageUrl varchar(2083),
    boardId bigint unsigned not null,
    userId varchar(255) not null,
    primary key (cardId)
)`, (err, result, fields) => {
    if (err) {
        console.error('Card table creation failed: ' + err.stack);
        return;
    }
})


con.end();