var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js')

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//Create user account
app.get('/account/create/:name/:email/:password', function (req,res) {
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

//Login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email, req.params.password).
    then((user) => {
        console.log(user);
        res.send(user);

    });
});

//Find user Name
app.get('/account/login/:name', function (req, res) {
    dal.findOne(req.params.name).
    then((user) => {
        console.log(user);
        res.send(user);
    });
});

//Balance
app.get('/account/bal/:email', function (req, res) {
    dal.find(req.params.email, req.params.amount).
    then((user) => {
        console.log(user);
        res.send(user);
    });
});


//Deposit
app.get('/account/deposit/:email', function (req, res) {
    dal.find(req.params.email, req.params.amount).
    then((user) => {
        console.log(user);
        dal.update().
        then((data) => {
            console.log('dal.update success!')
            res.send(data)
        });
    });
});



//all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);