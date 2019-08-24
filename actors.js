const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 8080;

const app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mickey19",
    database: "Internet@922"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


//   * Create a `/cast` route that will display all the actors and their data ordered by their id's.
app.get("/cast", function (req, res) {
    console.log("This is my cast route");
    connection.query("SELECT * from actors;", function (err, data) {
        console.log(data);
        var html = "<html><h1>Seinfeld Cast</h1>"
        for (var i = 0; i < data.length; i++) {
            html += "<h2>" + data[i].name + "</h2>";
            html += "<h5>" + data[i].id + "</h5>";
            html += "<h5>" + data[i].coolness_points + "</h5>";
            html += "<h5>" + data[i].attitudes + "</h5>";
        }
        html += "</html>";
        res.send(html);
    });
});
//   * Create a `/coolness-chart` route that will display all the actors and their data ordered by their coolness points.
app.get("/coolness-chart/:count", function (req, res) {
    console.log("This is my coolness chart route");
    console.log(req.params.count);
    connection.query("SELECT * from actors WHERE coolness_points = ? ORDER BY coolness_points DESC;", [req.params.count], function (err, data) {
        console.log(data);
        var html = "<html><h1>Seinfeld Cast</h1>"
        for (var i = 0; i < data.length; i++) {
            html += "<h2>" + data[i].name + "</h2>";
            html += "<h5>" + data[i].id + "</h5>";
            html += "<h5>" + data[i].coolness_points + "</h5>";
            html += "<h5>" + data[i].attitudes + "</h5>";
        }
        html += "</html>";
        res.send(html);
    });
});

app.get("/coolness-chart", function (req, res) {
    console.log("This is my coolness chart route");
    connection.query("SELECT * from actors ORDER BY coolness_points DESC;", function (err, data) {
        console.log(data);
        var html = "<html><h1>Seinfeld Cast</h1>"
        for (var i = 0; i < data.length; i++) {
            html += "<h2>" + data[i].name + "</h2>";
            html += "<h5>" + data[i].id + "</h5>";
            html += "<h5>" + data[i].coolness_points + "</h5>";
            html += "<h5>" + data[i].attitudes + "</h5>";
        }
        html += "</html>";
        res.send(html);
    });
});
//   * Create a `/attitude-chart/:att` route that will display all the actors for a specific type of attitude.
app.get("/attitude-chart/:att", function (req, res) {
    console.log("This is my coolness chart route");
    const attitudeToSearch = req.params.att;
    console.log(attitudeToSearch);
    connection.query("SELECT * from actors WHERE attitudes = ?;", [attitudeToSearch], function (err, data) {
        console.log(data);
        var html = "<html><h1>Seinfeld Cast</h1>"
        for (var i = 0; i < data.length; i++) {
            html += "<h2>" + data[i].name + "</h2>";
            html += "<h5>" + data[i].id + "</h5>";
            html += "<h5>" + data[i].coolness_points + "</h5>";
            html += "<h5>" + data[i].attitudes + "</h5>";
        }
        html += "</html>";
        if (data.length === 0) {
            return res.send("<h1>Sorry! No characters found with that attribute!</h1>");
        }
        res.send(html);
    });
});

app.get("*", function (req, res) {
    console.log("This is my error route");
    res.status(404)        // HTTP status 404: NotFound
        .send("<html><h1>Sorry! We couldn't find what you were looking for!</h1></html>");
});



app.listen(PORT, function () {
    console.log("Listening on http://localhost:" + PORT);
});




