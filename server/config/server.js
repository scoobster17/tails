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
var mongoUtil = require('../database/config/mongoUtil'); // use ./ to look for local module not npm module
mongoUtil.connect();

/**
 * Allow access to directories with static content for CSS, JS etc
 */

// Point server to app and it's assets
app.use( express.static(__dirname + "/../../app") );

app.use(express.static('bower_components'));
app.use('/bower_components', express.static('bower_components'));

/**
 * Supply data and pages to URL requests
 */
app.get('/', function(req, res) {
	fs.readFile( __dirname + '/index.html', 'utf8', function(err, data) {
		res.end(data);
	});
});

/**
 * Get text data
 */
app.get('/text', function(req, res) {
	fs.readFile( __dirname + '/../database/data/text/text_en_gb.json', 'utf8', function(err, data) {
		res.end(data);
	});
});

/**
 * Get stories data
 */
app.get('/storiesData', function(req, res) {
	/*
		MANUAL DATA BEFORE APP RE-ORGANISED
		fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {
			res.end(data);
		});
	*/

	var stories = mongoUtil.stories();
	stories.find().toArray(function(err, docs) {
		res.json(docs);
	});
});

/**
 * Get data for a specific story
 */
app.get('/storiesData/:modifiedName', function(req, res) {
	/*
		MANUAL DATA BEFORE APP RE-ORGANISED
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
	*/

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
 * Save new story to MongoDB
 */
app.get('/addComponentInstance', function(req, res) {

	var stories = mongoUtil.stories();
	var componentInstanceDetails = req.query;
	var componentIndex = componentInstanceDetails.componentIndex;

	// construct mongo query object with dynamic property name for component search
 	var queryObj = {
 		modifiedName: componentInstanceDetails.modifiedStoryName
 	}
 	queryObj["components." + componentIndex + ".list.0"] = {
		$exists: true
	};

	// check whether the component has any instances
	stories.find(queryObj).next(function(err, doc) {
		if (err) res.sendStatus(400);

		// if the component does not have any instances, create an array and
		// insert the instance as first
		if (doc == null) {
			stories.update(
				{
					modifiedName: componentInstanceDetails.modifiedStoryName,
					"components.modifiedComponentName": componentInstanceDetails.modifiedComponentName
				},
				{
					$set: {
						"components.$.list": [
							req.query
						]
					}
				},
				function(err, saved) {
					if (err || !saved) res.sendStatus(400);
					res.json({success: true});
				}
			);

		// if entries exist, append to the component instances list
		} else {
			stories.update(
				{
					modifiedName: componentInstanceDetails.modifiedStoryName,
					"components.modifiedComponentName": componentInstanceDetails.modifiedComponentName
				},
				{
					$addToSet: {
						"components.$.list": req.query
					}
				},
				function(err, saved) {
					if (err || !saved) res.sendStatus(400);
					res.json({success: true});
				}
			);
		}
	});

});

/**
 * Get data for a specific component for a story
 */
app.get('/storiesData/:modifiedName/:modifiedComponentName', function(req, res) {
	fs.readFile( __dirname + '/data/stories/stories.json', 'utf8', function(err, data) {

		// parse the response into JSON format
		var stories = JSON.parse(data);

		// filter the response data to return only the story that matches param
		var filteredStory = stories.filter(function(story) {
			return story.modifiedName === req.params.modifiedName;
		});

		// cancel if no matching story is found
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