
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:root@ds139430.mlab.com:39430/demo';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//register service
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
var insertDocument = function(db, data, callback) {

    db.collection('demo').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the demo collection.");
        callback();
    });
};
//delete service
app.post('/delete', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        deleteUser(db, req.body, function() {
            res.write("Successfully deleted");
            res.end();
        });
    });
})
var deleteUser = function(db, data, callback) {

    db.collection('demo').deleteOne( {"email": data.email}, function(err, result) {
        if(err)
        {
            res.write("deletion Failed, Error While Deleting");
            res.end();
        }
        console.log("Deleted a user ecord");
        callback();
    });
};

//get_users details
app.post('/get_users', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        get_users(db, req.body, function() {
            res.write("Successfully read");
            res.end();
        });
    });
})
var get_users = function(db, callback) {


        var cursor =db.collection('demo').find();
        cursor.toArray(function(err, doc) {
            assert.equal(err, null);
            j=doc;
            JSON.stringify(j);
            doc1=j;
            for (var i=0;i<doc.length;i++) {
                result.body.push({"ID":doc[i]._id,"fname": doc[i].fname,"lname": doc[i].lname,"email": doc[i].email});
            }console.log(result);
            res.contentType('application/json');
            res.write(JSON.stringify(j));
            res.end();
        callback();
    });
};

//update sservice.
app.post('/update_user', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        updateDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });

var email=req.body.email;
var item={fname:req.body.fn,lname:req.body.ln,password:req.body.pwd};
var updateDocument = function(db, data, callback) {
    db.collection('demo').updateOne({"email":email},{$set:item}, function(err, result) {
        if (err) {
            res.write("updation Failed");
            res.end();
        }
        })
}
})



var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

