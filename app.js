const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const Aws = require('aws-sdk');
var multer = require("multer");
const { response } = require("express");
const app = express();
const port = 5000;
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const con = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
)
con.connect();

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})

app.get("/get-cards/", (req, res) => {
    let boardId = req.query.boardId;
    let queryString = `
        SELECT cardId,
            message,
            createTime,
            senderLastName,
            senderFirstName,
            imageUrl 
        FROM card 
        WHERE boardId = ?`;
    con.query(queryString, [[[boardId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the cards are being retrieved..." });
        }
        let responseContent = {
            cards: result.map(
                obj => {
                    return {
                        cardId: obj.cardId,
                        message: obj.message,
                        createTime: obj.createTime,
                        senderLastName: obj.senderLastName,
                        senderFirstName: obj.senderFirstName,
                        imageUrl: obj.imageUrl
                    }
                }
            )
        }
        res.json(responseContent);
    })
});

app.get("/get-board/", (req, res) => {
    let boardId = req.query.boardId;
    let queryString = `
        SELECT
            title,
            createTime
        FROM board 
        WHERE boardId = ?`;
    con.query(queryString, [[[boardId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the board are being retrieved..." });
        }
        let [board] = result;
        console.log(`get board ${boardId}: title is ${board.title} and createTime is ${board.createTime}`);
        let responseContent = {
            title: board.title,
            createTime: board.createTime
        };
        res.json(responseContent);
    })
});

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: filefilter
});

app.post("/create-card", upload.single("cardImage"), async (req, res) => {
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read-write",
        ContentType: "image/jpeg"
    };
    /*
    s3.upload(s3Params, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Something wrong when the card is being created..." })
        }
        let imageUrl = data.Location;
    })
    */
    let storedImage;
    try {
        storedImage = await s3.upload(s3Params).promise();
    }
    catch (error) {
        console.log(error);
    }

    let queryString = `
    INSERT INTO card (
        message,
        boardId,
        senderLastName,
        senderFirstName,
        imageUrl
    ) VALUES ?` ;
    con.query(queryString, [[[
        req.body.message,
        req.body.boardId,
        req.body.senderLastName,
        req.body.senderFirstName,
        storedImage.Location
    ]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the card is being created..." });
        }
        let responseContent = { cardId: result.insertId };
        res.json(responseContent);
    })
});


app.post("/create-board", upload.array(), (req, res) => {
    let queryString = `
        INSERT INTO board
            (title) VALUES ?`;
    con.query(queryString, [[[req.body.title]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the board are being created..." });
        }
        let responseContent = { boardId: result.insertId };
        res.json(responseContent);
    })
});


// set up an application server
app.listen(port, (err) => {
    if (err) console.log("Error is occurring in the server setup!");
    console.log(`app is listening on the port ${port}.`);
})
