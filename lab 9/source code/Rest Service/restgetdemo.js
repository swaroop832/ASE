/**
 * Created by Marmik on 04/10/2016.
 */
var express = require('express');
var app = express();
var request = require('request');
app.get('/search', function (req, res) {
    var result={
        'venue': []
    };

    request('https://kgsearch.googleapis.com/v1/entities:search?query=chandra+babu+naidu&key=AIzaSyDlBQyr6XbPwHAdbgqud2vhU6NbteWyI7Q&limit=1&indent=True', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        var ven = body.itemListElement;
        for(var i=0;i<ven.length;i++)
        {
            result.venue.push({'name': ven[i].result.name,
                                });
        }
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
    });
    console.log(result);


})

var server = app.listen(8089, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})