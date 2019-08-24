// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");


// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Data
// var lunches = [
//     {
//         lunch: "Beet & Goat Cheese Salad with minestrone soup."
//     }, {
//         lunch: "Pizza, two double veggie burgers, fries with a Big Gulp"
//     }
// ];


var icecreams = [
    { name: 'vanilla', price: 10, awesomeness: 3 },
    { name: 'chocolate', price: 4, awesomeness: 8 },
    { name: 'banana', price: 1, awesomeness: 1 },
    { name: 'greentea', price: 5, awesomeness: 7 },
    { name: 'jawbreakers', price: 6, awesomeness: 2 },
];

// Routes
// app.get("/weekday", function (req, res) {
//     res.render("index", lunches[0]);
// });

// app.get("/weekend", function (req, res) {
//     res.render("index", lunches[1]);
// });

// app.get("/lunches", function (req, res) {
//     res.render("all-lunches", {
//         foods: lunches,
//         eater: "david"
//     });
// });

app.get("/icecreams", function (req, res) {
    res.render("index", icecreams[1]);
});


//   * Do not use MySQL for this assignment! Use the`icecreams` variable above as your data.Add the variable to your`server.js` file.

//   * Using handlebars and express, create a route called`/icecream/:name`.When the route is hit, it will display the name, price and awesomeness for that specific ice cream.

//   * Create an`/icecreams` route.It will loop over all the ice creams and display them all to the user.


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
