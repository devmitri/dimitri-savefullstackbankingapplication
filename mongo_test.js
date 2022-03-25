const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    //connect to myproject database
    const dbName = 'myproject';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    //insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document inserted');
    });
});