const Aws = require('aws-sdk');
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const express = require("express");
const GoogleStrategy = require("passport-google-oauth20");
const mysql = require("mysql");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

const { createMulter } = require("./util");
const { googleAuth } = require("./googleAuth");
const { localAuth } = require("./localAuth");
const { serializeAndDeserialize } = require("./passportSerialization");

const app = express();
if (process.env.NODE_ENV.trim() === "dev") {
    require('dotenv').config();
    console.log(`The present env is ${process.env.NODE_ENV.trim()}, and the app is listening at port ${process.env.PORT}`);
}


const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
con.connect();
localAuth(con);
googleAuth(process.env.NODE_ENV);
serializeAndDeserialize();

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
})
const upload = createMulter(["image/jpeg", "image/jpg"])
const sessionChecker = (req, res, next) => { req.session ? next() : res.status(401).json({ message: "authorized action" }) };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static((process.env.NODE_ENV.trim() === "dev" ? process.env.STATIC_FOLDER : path.join(__dirname, "dist"))));
app.use(session({ secret: "cats", cookie: { maxAge: 1000000 } }));
app.use(passport.initialize());
app.use(passport.session());

app.get(["/board/:queryString", "card/:queryString"], function (req, res) { // http request to url "/board/:id" and get index.html file
    console.log("get file from the path: ", (process.env.NODE_ENV.trim() === "dev" ? path.join(process.env.STATIC_FOLDER, "index.html") : path.join(__dirname, "dist/index.html")));
    res.sendFile((process.env.NODE_ENV.trim() === "dev" ? path.join(process.env.STATIC_FOLDER, "index.html") : path.join(__dirname, "dist/index.html")));
});

app.get("/authenticate-checker", (req, res) => {
    let authenticateInfo;
    if (req.session.passport) {
        authenticateInfo = {
            displayName: req.session.passport.user.displayName,
            authenticate: true
        }
    }
    else {
        authenticateInfo = {
            displayName: "",
            authenticate: false
        }
    }
    res.json(authenticateInfo);
})

app.get("/get-cards/", (req, res) => {
    let boardId = req.query.boardId;
    let queryString = `
        SELECT card.cardId AS cardId,
            card.message AS message,
            card.createTime AS createTime,
            card.imageUrl AS imageUrl,
            card.userId AS userId,
            users.displayName AS displayName  
        FROM card
        LEFT JOIN users
        ON card.userId = users.userId 
        WHERE card.boardId = ?`;
    con.query(queryString, [[[boardId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the cards are being retrieved..." });
        }

        let userId;
        if (req.session.passport) {
            userId = req.session.passport.user.userId;
        }
        else {
            userId = undefined;
        }

        let responseContent = {
            cards: result.map(
                obj => {
                    return {
                        cardId: obj.cardId,
                        editable: !userId ? false : userId === obj.userId,
                        message: obj.message,
                        createTime: obj.createTime,
                        displayName: obj.displayName,
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
            board.title AS title,
            board.userId AS userId,
            board.createTime AS createTime,
            users.displayName AS displayName
        FROM board
        LEFT JOIN users
        ON board.userId = users.userId 
        WHERE boardId = ?`;
    con.query(queryString, [[[boardId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the board is being retrieved..." });
        }
        let [board] = result;
        console.log(`get board ${boardId}: title is ${board.title} and createTime is ${board.createTime}`);

        let userId;
        if (req.session.passport) {
            userId = req.session.passport.user.userId;
        }
        else {
            userId = undefined;
        }

        let responseContent = {
            displayName: board.displayName,
            editable: !userId ? false : userId === board.userId,
            title: board.title,
            createTime: board.createTime
        };
        res.json(responseContent);
    })
});


app.post("/create-card", sessionChecker, upload.single("cardImage"), (req, res, next) => {
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
        imageUrl,
        boardId
    ) VALUES ?` ;
    con.query(queryString, [[[
        req.body.message,
        req.session.passport.user.userId,
        storedImage.Location,
        req.query.boardId,
    ]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the card is being created..." });
        }
        let responseContent = { cardId: result.insertId };
        console.log("A card has been writen into the database.")
        res.json(responseContent);
    })
});


app.post("/create-board", sessionChecker, upload.array(), (req, res) => {
    console.log(req.session);
    let queryString = `
        INSERT INTO board (
            title,
            userId) VALUES ?`;
    con.query(queryString, [[[req.body.title, req.session.passport.user.userId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Something wrong when the board are being created..." });
        }
        let responseContent = { boardId: result.insertId };
        res.json(responseContent);
    })
});


app.post("/edit-card", sessionChecker, upload.single("cardImage"), (req, res, next) => {
    let findCardQueryString = `SELECT userId FROM card WHERE cardId = ?`;
    con.query(findCardQueryString, [[[req.query.cardId]]], (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong when the card was being edited.");
        }
        else if (result.length === 0) {
            console.log(`Card with ID of ${req.query.cardId} does not exist.`);
            res.status(404).json({ message: "The card is not found." })
        }
        else if (result[0].userId === req.session.passport.user.userId) {
            next();
        }
        else {
            console.log("The user is unauthorized to edit the card.");
            res.status(403).json({ message: "unauthorized action" });
        }
    })
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
            console.log("Card content has been modified.\n");
            next();
        }
        else {
            console.log("Card content has been modified, but image is remain the same.")
            res.status(200).json({ message: "Card content has been modified, but no image is updated." });
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
    WHERE cardId = ?`;
    con.query(editCardImageQueryString, [
        storedImage.Location,
        req.query.cardId,
    ], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong when the card was being updated..." });
        }
        console.log("New image has been added.");
        res.status(200).json({ message: "Card content and new image have been modified" });
    })
});

app.delete("/delete-card", sessionChecker, (req, res, next) => {
    let findCardQueryString = `SELECT userId FROM card WHERE cardId = ?`;
    con.query(findCardQueryString, [[[req.query.cardId]]], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong when the card was being found..." });
        }
        else if (result.length === 0) {
            console.log(`Card with ID of ${req.query.cardId} does not exist.`);
            res.status(404).json({ message: "The card is not found." });
        }
        else if (result[0].userId === req.session.passport.user.userId) {
            console.log("Delete action has been authorized.");
            next();
        }
        else {
            console.log("unauthorized delete action");
            res.status(403).json({ message: "The delete action is unauthorized." });
        }
    })
}, (req, res) => {
    let deleteQueryString = `DELETE FROM card WHERE cardId = ?`;
    con.query(deleteQueryString, [[[req.query.cardId]]], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong when the card was being deleted..." });
        }
        else {
            console.log(`Card with ID of ${req.query.cardId} has been deleted.`);
            res.json({ message: "The card has been deleted." });
        }

    })
})



const localUserChecker = (req, res, next) => {
    con.query(`SELECT * FROM users WHERE userId = ?`, [[[`local` + req.body.userId]]], (error, result) => {
        result.length ? res.status(409).json({ message: `User with ${"local" + req.body.userId} user ID already exists.` }) : next();
    })
}
app.post("/local-sign-up", upload.single("userImage"), localUserChecker, async (req, res) => {

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

    const salt = bcrypt.genSaltSync(10);
    let passwordHash = bcrypt.hashSync(req.body.password, salt);
    let queryString = `
    INSERT INTO users (
        provider,
        userId,
        lastName,
        firstName,
        displayName,
        imageUrl,
        passwordHash
    ) VALUES ?`;

    con.query(queryString, [[["local", "local" + req.body.username, req.body.lastName, req.body.firstName, req.body.displayName, storedImage.Location, passwordHash]]],
        (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Something went wrong when user was being created." });
            }
            else {
                console.log(`User with ${"local" + req.body.username} has been created.`);
                res.json({ message: `User with ${"local" + req.body.username} has been created.` });
            }
        }
    )

});

app.get("/login/google", passport.authenticate("google", { scope: ["profile"] }));
app.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/google/success",
}));

app.post("/login/local", upload.none(), passport.authenticate("local", { failureRedirect: "/local/failure", successRedirect: "/local/success" }));


let loginHandler = (req, res, next) => {
    req.user ? next() : res.status(401).json({ message: "unauthorized action" })
}

app.get("/google/success", loginHandler, (req, res) => {
    let findUserQueryString = `
        SELECT provider,
            userId,
            lastName,
            firstName,
            createTime
        FROM users 
        WHERE userid = ?`;

    let createUserQueryString = `
        INSERT INTO users (
            userId,
            lastName,
            firstName,
            displayName,
            provider,
            imageUrl
        ) VALUES ?`;

    con.query(findUserQueryString, [[[req.user.userId]]], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Something wrong when finding the user." })
        }
        else if (result.length === 0) {
            con.query(createUserQueryString, [[[
                req.user.userId,
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
                    req.session.passport.user.userId = req.user.userId;
                    res.send("Hello, new friend.");
                }
            })
        }
        else {
            req.session.passport.user.userId = req.user.userId;
            console.log(`The user ${req.user.displayName} has been found.\n`);
            res.send(`Hello, stranger.`);
        }
    })
})


app.get("/local/failure", (req, res) => {
    res.status(401).json({ message: "unauthorized action" });
});

app.get("/local/success", (req, res) => {
    res.status(200).json({ message: "Hello, stranger." });
})

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { res.status(500).send("Something went wrong.") }
        req.session.destroy();
        res.send("bye");
    })
})


app.listen(process.env.PORT, (err) => {
    if (err) console.log("Error is occurring in the server setup!");
    console.log(`app is listening on the port ${process.env.PORT}.`);
    if (process.env.NODE_ENV.trim() == "dev") {
        console.log("dev environment");
    }
    else {
        console.log("prod environment");
    }
})