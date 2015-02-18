var express = require("express");
var layouts = require("express-layout");
var jade = require("jade");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

var app = express();

app.engine("view engine", jade.__express);
app.set("view engine", "jade");

//Middleware
app.use(express.static("public"));
app.use(layouts());
app.use(bodyParser());
app.use(methodOverride("_method"));

app.set("layout", "application");

//DB
mongoose.connect("mongodb://localhost/hidans_answers")

var questions_controller = require("./controllers/questions");
questions_controller(app);

app.get("/", function(request, response){
  response.render("index");
});

console.log("Server has started. Listenening in port 5000.");
app.listen(5000);

