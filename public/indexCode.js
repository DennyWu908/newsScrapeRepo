var newsData = $("#newsContainer")

function readyPage () {
		
	newsData.empty();

}

function newsDisplay () {

	// Replace below with or add ajax call to below
	
	$.getJSON("/index", function(data) {
		for (var i = 0; i < data.length; i++) {
			newsData.append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].url + "</p>");
		}
	})
}

$(document).ready(function() {

	readyPage();
	newsDisplay();

})