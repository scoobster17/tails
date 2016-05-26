/**
 * Server.js
 *
 * Starts a node server and supplies resources & data to app
 */

'use strict';

/**
 * Dependencies
 */
var express = require('express');
var app = express();
var fs = require('fs');
var mongoUtil = require('./mongoUtil'); // use ./ to look for local module not npm module
mongoUtil.connect();

/**
 * Allow access to directories with static content for CSS, JS etc
 */

// For when migrating files to app folder
// app.use( express.static(__dirname + "/../app") );

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
	/*fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {
		res.end(data);
	});*/

	var stories = mongoUtil.stories();
	stories.find().toArray(function(err, docs) {
		res.json(docs);
	});
});

/**
 * Get stories data (TEMPORARY until introduce Mongo)
 */
app.get('/storiesData/:modifiedName', function(req, res) {
	/*fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {

		// parse the response into JSON format
		var stories = JSON.parse(data);

		// filter the response data to return only the story that matches param
		var filteredStory = stories.filter(function(story) {
			return story.modifiedName === req.params.modifiedName;
		});

		// return story in string JSON format
		res.end(JSON.stringify(filteredStory));
	});*/

	var storyModifiedName = req.params.modifiedName;
	var stories = mongoUtil.stories();
	stories.find({modifiedName: storyModifiedName}).limit(1).toArray(function(err, doc) {
		if (err) {
			res.sendStatus(400);
		}
		res.json(doc);
	})
});

/**
 * Save new story to MongoDB
 */
app.get('/addStory', function(req, res) {

	var storyDetails = req.query;
	var stories = mongoUtil.stories();

	stories.save(storyDetails, function(err, saved) {
		if (err || !saved) res.sendStatus(400);
		res.json({success: true});
	});

});

/**
 * Remove a story from MongoDB
 */
app.get('/deleteStory', function(req, res) {

	var storyName = req.query.name;
	var stories = mongoUtil.stories();

	stories.remove({name: storyName}, function(err, result) {
		if (err || !result) res.sendStatus(400);
		res.json({success: true});
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