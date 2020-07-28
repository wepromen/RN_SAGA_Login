var cors = require("cors");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const express = require("express");
const app = express();
app.use(cors());
const port = 3000;
var bodyParser = require("body-parser");
const { response } = require("express");
const { request } = require("http");
var jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create MongoBD client
var MongoClient = mongodb.MongoClient;
// connect url DB
var url = "mongodb://localhost:27017";
var connect_db;
MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, client) {
    if (err) {
      console.log("Unable to connect to MongoDB", err);
    } else {
      connect_db = client.db("logindb");
    }
  }
);

// Register router
app.post("/register", function (req, res) {
  var post_data = req.body;

  res.send(post_data);

  var email = post_data.email;
  var password = post_data.password;

  var insertJson = {
    email: email,
    password: password,
  };

  connect_db
    .collection("users")
    .find({ email: email })
    .count(function (err, number) {
      console.log(`Count: ${number}`);
      if (number !== 0) {
        res.json({msg: 'Email existed!'});
        console.log("Email existed!!!");
      } else {
        connect_db
          .collection("users")
          .insertOne(insertJson, function (err, result) {
            // res.send('Reg success')
            console.log(`Result arr: ${result}`);
            console.log(
              `Reg success email: ${insertJson.email} pass: ${insertJson.password}`
            );
          });
      }
    });
});

// router login
app.post("/login", (req, res) => {
  var post_data = req.body;

  var email = post_data.email;
  var password = post_data.password;

  connect_db
    .collection("users")
    .find({ email: email })
    .count(function (err, number) {
      if (number === 0) {
        console.log("Email not exists");
        res.json({
          isLogined: false,
          msg: "Email not exists",
          email: email,
          password: password,
        });
      } else {
        // authentication
        connect_db.collection("users").findOne(
          {
            email: email, // find to a record which have email field equal entered email
          },
          function (err, aRecord) {
            if (aRecord.email === email && aRecord.password === password) {
              console.log(aRecord);
              // res.json({"success":1,"email":email,"password":password})
              // Create a Json Web Token
              var token = jwt.sign(
                {
                  email: aRecord.email,
                  password: aRecord.password,
                  isLogined: true,
                },
                "7777",
                {
                  algorithm: "HS256",
                  expiresIn: "3h",
                }
              );
              // return Token & isLogined frontend -> LoginView.js
              res.json({ access_token: token, isLoggined: true });
              console.log("***Post /login | login success.");
            } else {
              res.json({
                isLogined: false,
                msg: "Wrong password",
                email: email,
                password: password,
              });
              console.log("Wrong password");
            }
          }
        );
      }
    });
});

// // Middleware
// app.use((req, res, next) => { // console.log('%O', req);
//     if (req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
//         var token = req.headers.authorization.split(' ')[1];
//         jwt.verify(token, '7777', (err, decode) => { // verify token code 7777
//             if (err) {
//                 return res.status(403).send({message: 'Token invalid'})
//             } else {
//                 //console.log(decode);
//                 return next();
//             }
//         })
//     } else {
//         return res.status(403).send({message: 'Unauthorized',herders: req.headers.authorization.split(' ')[1] })
//     }
// });

// Authentication router
app.get("/", async (req, res) => {
  if (req.headers && req.headers.authorization) {
    await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "7777",
      (err, decode) => {
        if (err) {
          return res.json({ isLoggined: "false" });
          return res.status(403).send({ message: "Token invalid" });
        } else {
          console.log(`***get success decode token: ${JSON.stringify(decode)}`);
          // send isLoggined to NotiveView
          return res.json({ isLoggined: "true" });
        }
      }
    );
  } else {
    console.log("***get / : else");
    return res.json({ isLoggined: "false" });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
