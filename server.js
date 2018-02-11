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
mongoose.connect("mongodb://localhost/newsDB", {
  useMongoClient: true
});

var DB = mongoose.connection
DB.on("error", err => console.log(err))
DB.once("open", () => console.log("Mongoose connection successful."))

app.get("/index", function(req, res) {
	
	axios.get("https://www.washingtonpost.com/").then(function(response) {
		var $ = cheerio.load(response.data);

		$("div.headline").each(function(i, element) {
			
			if ($(this).children("a").attr("href")) {

				var articleData = {
					headline: $(this).text(),
					summary: $("div.blurb.normal.normal-style").text(),
					url: $(this).children("a").attr("href"),
					saved: false
				}

				db.Article.create(articleData).catch(err => {console.log(err)})

			}
		})

		// console.log(articleData)

	})

})

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});