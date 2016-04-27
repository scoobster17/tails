/**
 * Server.js
 *
 * Starts a node server and supplies resources & data to app
 */

/**
 * Dependencies
 */
var express = require('express');
var app = express();
var fs = require('fs');

/**
 * Allow access to directories with static content for CSS, JS etc
 */
app.use(express.static('bower_components'));
app.use('/bower_components', express.static('bower_components'));

app.use(express.static('css'));
app.use('/css', express.static('css'));

app.use(express.static('js'));
app.use('/js', express.static('js'));

app.use(express.static('templates'));
app.use('/templates', express.static('templates'));

/**
 * Supply data and pages to URL requests
 */
app.get('/', function(req, res) {
	fs.readFile( __dirname + '/index.html', 'utf8', function(err, data) {
		res.end(data);
	});
});

/**
 * Get text data (TEMPORARY until introduce Mongo)
 */
app.get('/text', function(req, res) {
	fs.readFile( __dirname + '/data/text/text_en_gb.json', 'utf8', function(err, data) {
		res.end(data);
	});
});

/**
 * Get stories data (TEMPORARY until introduce Mongo)
 */
app.get('/storiesData', function(req, res) {
	fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {
		res.end(data);
	});
});

/**
 * Get stories data (TEMPORARY until introduce Mongo)
 */
app.get('/storiesData/:modifiedName', function(req, res) {
	fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {

		// parse the response into JSON format
		var stories = JSON.parse(data);

		// filter the response data to return only the story that matches param
		var filteredStory = stories.filter(function(story) {
			return story.modifiedName === req.params.modifiedName;
		});

		// return story in string JSON format
		res.end(JSON.stringify(filteredStory));
	});
});

/**
 * Get stories data (TEMPORARY until introduce Mongo)
 */
app.get('/storiesData/:modifiedName/:modifiedComponentName', function(req, res) {
	fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {

		// parse the response into JSON format
		var stories = JSON.parse(data);

		// filter the response data to return only the story that matches param
		var filteredStory = stories.filter(function(story) {
			return story.modifiedName === req.params.modifiedName;
		});

		// cancel if no matching story if found
		if (!filteredStory[0].components) return false;

		// filter the matching story's components to return only one matching param
		var filteredComponent = filteredStory[0].components.filter(function(component) {
			return component.modifiedComponentName === req.params.modifiedComponentName;
		});

		// return component in string JSON format
		res.end(JSON.stringify(filteredComponent));
	});
});

/**
 * Server setup and config
 */
var server = app.listen(7411, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Tails app listening @ http://%s:%s", host, port);

});