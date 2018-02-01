var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsscrapeassignment", {
  useMongoClient: true
});

app.get("/index", function(req, res) {
	
	axios.get("https://www.washingtonpost.com/").then(function(response) {
		var $ = cheerio.load(response.data);

		$("div.headline").each(function(i, element) {
			
			var result = {
				title: $(this).text(),
				summary: $("div.blurb.normal.normal-style").text()
			}
			console.log(result)

		})
	})

})

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});