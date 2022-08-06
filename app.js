const Aws = require('aws-sdk');
const bodyParser = require("body-parser");
const express = require("express");
//const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const session = require("express-session");

const con = require("./db");
const { createMulter } = require("./util");
require("./googleAuth");

const app = express();
const port = 5000;
require('dotenv').config();

con.connect();
const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})
const upload = createMulter(["image/jpeg", "image/jpg"])

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "cats", cookie: { maxAge: 1000000 } }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/get-cards/", (req, res) => {
    let boardId = req.query.boardId;
    let queryString = `
        SELECT cardId,
            message,
            createTime,
            senderId,
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
                        senderId: obj.senderId,
                        imageUrl: obj.imageUrl
                    }
                }
            )
        }
        res.json(responseContent);
    })
});
/*
app.get("/get-board/", (req, res) => {
    let boardId = req.query.boardId;
    let queryString = `
        SELECT
            title,
            createTime
        FROM board 
        WHERE boardId = ?`;
    con.query(queryString, [boardId], (err, result, fields) => {
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
*/

app.post("/create-card", upload.single("cardImage"), (req, res, next) => {
    req.file ? next() : res.json({ message: "Card creation is failed due to no file selected." });
}, async (req, res) => {
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read-write",
        ContentType: "image/jpeg"
    };

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
        userId,
        senderId,
        imageUrl,
        boardId
    ) VALUES ?` ;
    con.query(queryString, [[[
        req.body.message,
        req.body.userId,
        req.body.senderId,
        storedImage.Location,
        req.body.boardId,
    ]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the card is being created..." });
        }
        let responseContent = { cardId: result.insertId };
        res.json(responseContent);
    })
});

/* 
app.post("/create-board", upload.array(), (req, res) => {
    let queryString = `
        INSERT INTO board
            (title) VALUES ?`;
    con.query(queryString, [req.body.title], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the board are being created..." });
        }
        let responseContent = { boardId: result.insertId };
        res.json(responseContent);
    })
});
*/

app.post("/edit-card", upload.single("cardImage"), (req, res, next) => {
    if (!req.session) {
        console.log("the user has not logged in or the cookie has been expired.");
        res.redirect("/login/google");
    }
    else {
        let findCardQueryString = `
        SELECT cardId,
            senderId,
            boardId
        FROM card 
        WHERE cardId = ?`;
        con.query(findCardQueryString, [[[req.query.cardId]]], (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong when the card was being edited.");
            }
            else if (result.length === 0) {
                console.log(`Card with ID of ${req.query.cardId} does not exist.`);
                res.status(403).json({ message: "The card does not exist." })
            }
            else if (result[0].senderId === req.session.passport.user.userId) {
                req.body.boardId = result[0].boardId;
                next();
            }
            else {
                console.log("The user is unauthorized to edit the card.");
                res.status(401).json({ message: "unauthorized action" });
            }
        })
    }
}, (req, res, next) => {
    req.body.message ? next() : res.status(403).json({ message: "Some modification must been done." });

}, (req, res, next) => {
    let editCardMessageQueryString = `
    UPDATE card
    SET message = ?
    WHERE cardId = ?`;

    con.query(editCardMessageQueryString, [req.body.message, req.query.cardId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong when the card was being updated..." });
        }
        if (req.file) {
            next();
        }
        else {
            console.log("Card content has been modified, but image is remain the same.")
            res.status(200).redirect(`/get-cards/?boardId=${req.body.boardId}`);
        }
    })
}, async (req, res) => {
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read-write",
        ContentType: "image/jpeg"
    };

    let storedImage;
    try {
        storedImage = await s3.upload(s3Params).promise();
    }
    catch (error) {
        console.log(error);
    }

    let editCardImageQueryString = `
    UPDATE card
    SET imageUrl = ?
    WHERE cardId = ?`;;
    con.query(editCardImageQueryString, [
        storedImage.Location,
        req.query.cardId,
    ], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong when the card was being updated..." });
        }
        console.log("New image has been added.");
        res.status(200).redirect(`/get-cards/?boardId=${req.body.boardId}`);
    })
});

app.get("/login/google", passport.authenticate("google", { scope: ["profile"] }));
app.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/success",
}));


let loginHandler = (req, res, next) => {
    req.user ? next() : res.status(401).json({ message: "unauthorized action" })
}
app.get("/success", loginHandler, (req, res) => {
    let findUserQueryString = `
        SELECT provider,
            userId,
            userLastName,
            userFirstName,
            createTime
        FROM users 
        WHERE provider = ? AND userIdInProvider = ?`;

    let createUserQueryString = `
        INSERT INTO users (
            userIdInProvider,
            userLastName,
            userFirstName,
            displayName,
            provider,
            imageUrl
        ) VALUES ?`;

    con.query(findUserQueryString, [req.user.provider, req.user.userIdInProvider], (err, result) => {
        if (err) {
            console.log(req.user.provider, req.user.userId);
            console.log(err);
            res.status(500).json({ message: "Something wrong when finding the user." })
        }
        else if (result.length === 0) {
            con.query(createUserQueryString, [[[
                req.user.userIdInProvider,
                req.user.lastName,
                req.user.firstName,
                req.user.displayName,
                req.user.provider,
                req.user.imageUrl
            ]]], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Something wrong when a new user is being created." });
                }
                else {
                    console.log(`New user ${req.user.displayName} has been created.\n Its user ID in the mySQL is ${result.insertId}.`);
                    req.session.passport.user.userId = result.insertId;
                    res.send("Hello, new friend.");
                }
            })
        }
        else {
            req.session.passport.user.userId = result[0].userId;
            console.log(`The user ${req.user.displayName} has been found.\n`);
            res.send(`Hello, stranger.`);
        }
    })
}
)

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { res.status(500).send("Something went wrong.") }
        req.session.destroy();
        res.send("bye");
    })
})

app.listen(port, (err) => {
    if (err) console.log("Error is occurring in the server setup!");
    console.log(`app is listening on the port ${port}.`);
})
