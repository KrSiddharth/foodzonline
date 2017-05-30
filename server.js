var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080


app.use("/modules", express.static(__dirname + '/modules'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/views", express.static(__dirname + '/views'));
app.use("/services", express.static(__dirname + '/services'));
app.use("/controllers", express.static(__dirname + '/controllers'));
app.use("/app.js", express.static(__dirname + '/app.js'));
app.use("/menu.json", express.static(__dirname + '/menu.json'));

app.get('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('app.html', { root: __dirname });
});

app.use(function(req, res, next, err) {
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
})

app.listen(8080, function() {
 console.log("Server is running at : http://localhost:8080");
});
