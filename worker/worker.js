const express = require("express");
//const mysql = require("mysql");
var AWS = require('aws-sdk');
const app = express();

const PORT = 8080;

AWS.config.update({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    }
});

/*
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//con.connect();

app.post("/", (req, res) => {
    console.log("=====================start=========================");
    /*
    let queryString = `
        SELECT
            board.title AS title,
            board.userId AS userId,
            board.createTime AS createTime,
            users.displayName AS displayName
        FROM board
        LEFT JOIN users
        ON board.userId = users.userId 
        WHERE boardId = ?`;
    con.query(queryString, [[[req.body.boardId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
        }
        let [board] = result;
        console.log(`get board ${req.body.boardId}: title is ${board.title} and createTime is ${board.createTime}`);
    });
    */
    var params = {
        Destination: { ToAddresses: [req.body.emailAddress] },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `Dear ${req.body.receiverName},\n        Hi, we are the FreeCardBoard team, ${req.body.displayName} invites you to leave some messages on his or her board. Please click the following URL: https://freecardboard.net/board/${req.body.boardId}.\n\nSincerely,\n\nFreeCardBoard team`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: "FreeCardBoard Invitation"
            }
        },
        Source: 'FreeCardBoardTeam@freecardboard.net'
    };

    let sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

    sendPromise
        .then(
            function (data) {
                console.log(data.MessageId);
            })
        .catch(
            function (err) {
                console.error(err, err.stack);
            }
        );

    console.log("~~~~~~~~~~~~~~~~~~~~~end~~~~~~~~~~~~~~~~~~~~~~~~~");
    res.status(200).send("Yeah!!!");
})

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`The server is listening at ${PORT}.`);
    }
})

