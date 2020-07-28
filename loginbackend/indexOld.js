var mongodb = require('mongodb')
var ObjectID = mongodb.ObjectID
var crypto = require('crypto')
var express = require('express')
var bodyParser = require('body-parser')
const { response } = require('express')
const { request } = require('http')
var app = express()

app.use(bodyParser.json)
app.use(bodyParser.urlencoded({extended:true}))

// create MongoBD client
var MongoClient = mongodb.MongoClient
// connect url
var url = 'mongodb://localhost:27017'

var connect_db;

MongoClient.connect(url,{useNewUrlParser: true}, function(err,client){
    if(err){
        console.log('Unable to connect to MongoDB',err)
    }else{
        connect_db=client.db('logindb');
    }
})

// register
app.post('/register',(request,response,next)=>{
    
    var post_data = request.body

    var email = post_data.email
    var password = post_data.password

    var insertJson = {
        'email': email,
        'password': password
    }

    // var db = connect_db;
    
    // check exists
    // db.collection('users')
    //     .find({'email': email}).count(function(err,number){
    //         if(number != 0){
    //             response.json('Email already exists')
    //             console.log('Email already exists')
    //         }else{
    //             db.collection('users')
    //                 .insertOne(insertJson,function(err,res){
    //                     response.json('Reg success')
    //                     console.log('Reg success')
    //                 })
    //         }
    //     })
    connect_db.collection('users')
        .find({'email': email}).toArray((error, result) => {
            if (error) {
                response.send("Error")
            } else{
                response.send("success")
            }
        })
})

app.post('/login',(request,response,next)=>{
    var post_data = request.body

    var email = post_data.email
    var password = post_data.password

    var db = client.db('logindb')
    
    // check exists
    db.collection('users')
        .find({'email': email}).count(function(err,number){
            if(number != 0){
                response.json('Email not exists')
                console.log('Email not exists')
            }else{
                // authentication
                db.collection('users')
                    .findOne({'email':email},function(err,users){
                        if(users.password == password){
                            response.json('login success.')
                            console.log('login success.')
                        }else{
                            response.json('Wrong password')
                            console.log('Wrong password')
                        }
                    })
            }
        })
})


app.listen(3000, ()=>{
    console.log('Connected to MongoDB, webserver running on port 3000')
})