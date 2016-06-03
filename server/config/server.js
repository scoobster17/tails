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
 * Save new story component to MongoDB
 */
app.get('/addComponent', function(req, res) {

	var stories = mongoUtil.stories();
	var componentDetails = req.query;
	var modifiedStoryName = componentDetails.modifiedStoryName;

	// same as db.stories.findOne({name: "Story 1"}).components.length;
	stories.find(
		{
			modifiedName: componentDetails.modifiedStoryName
		}
	).limit(1).toArray(function(err, doc) {

		if (err) {
			res.sendStatus(400);
		}

		// set the componentIndex based on the number of existing components
		componentDetails.componentIndex = doc[0].components.length;

		// remove details that we don't want saved
		delete componentDetails.modifiedStoryName;
		delete componentDetails.story;

		// update the database with the new component
		stories.update(
			{
				modifiedName: modifiedStoryName,
			},
			{
				$addToSet: {
					"components": componentDetails
				}
			},
			function(err, saved) {
				if (err || !saved) res.sendStatus(400);
				res.json({success: true});
			}
		);

	});
});

/**
 * Remove a component from a story
 */
app.get('/deleteComponent', function(req, res) {

	var stories = mongoUtil.stories();
	var componentDetails = req.query;

	stories.update(
		{modifiedName: req.query.storyModifiedName},
		{
			$pull: {
				components: {
					componentIndex: parseInt(req.query.componentIndex)
				}
			}
		},
		function(err, saved) {
			if (err || !saved) res.sendStatus(400);
			res.json({success: true});
		}
	)

});

/**
 * Save new story component instance to MongoDB
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
 * Remove a component instance from a story
 */
app.get('/deleteComponentInstance', function(req, res) {

	var stories = mongoUtil.stories();
	var instanceDetails = req.query;

	// same as db.stories.update({modifiedName: "story-1", "components.componentIndex": 3},{$pull: {"components.$.list": {"name": "Idea 1"}}});
	stories.update(
		{
			modifiedName: instanceDetails.modifiedStoryName,
			"components.componentIndex": parseInt(instanceDetails.componentIndex)
		},
		{
			$pull: {
				"components.$.list": {
					"name": instanceDetails.name
				}
			}
		},
		function(err, saved) {
			if (err || !saved) res.sendStatus(400);
			res.json({success: true});
		}
	)

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
 * Add a fieldset to the component instance page
 */
app.get('/addFieldset', function(req, res) {

	var stories = mongoUtil.stories();
	var fieldsetDetails = req.query;
	var modifiedStoryName = fieldsetDetails.modifiedStoryName;
	var modifiedComponentName = fieldsetDetails.modifiedComponentName;

	// same as db.stories.findOne({name: "Story 1"}).components.length;
	stories.find(
		{
			modifiedName: fieldsetDetails.modifiedStoryName
		}
	).limit(1).toArray(function(err, doc) {

		if (err) {
			res.sendStatus(400);
		}

		// find the number of fieldsets existing already
		var fieldsetsObj = (doc[0].components[parseInt(fieldsetDetails.componentIndex)].fieldsets);

		// set the fieldset order to be at the end by default based on the number of existing fieldsets
		if (fieldsetsObj) {
			fieldsetDetails.order = Object.keys(fieldsetsObj).length + 1;
		} else {
			fieldsetsObj = {};
			fieldsetDetails.order = 1;
		}

		// remove details that we don't want saved
		fieldsetDetails['name'] = fieldsetDetails.modifiedFieldsetName;
		fieldsetDetails['title'] = fieldsetDetails.fieldsetName;
		fieldsetsObj[fieldsetDetails.modifiedFieldsetName] = fieldsetDetails;
		delete fieldsetDetails.modifiedStoryName;
		delete fieldsetDetails.story;
		delete fieldsetDetails.componentIndex;
		delete fieldsetDetails.component;
		delete fieldsetDetails.instanceName;
		delete fieldsetDetails.modifiedComponentName;
		delete fieldsetDetails.modifiedInstanceName;
		delete fieldsetDetails.modifiedFieldsetName;
		delete fieldsetDetails.fieldsetName;

		stories.update(
			{
				modifiedName: modifiedStoryName,
				"components.modifiedComponentName": modifiedComponentName
			},
			{
				$set: {
					"components.$.fieldsets": fieldsetsObj
				}
			},
			function(err, saved) {
				if (err || !saved) res.sendStatus(400);
				res.json({success: true});
			}
		);

	});
});

/**
 * Add a field to the component instance page
 */
app.get('/addField', function(req, res) {

	var stories = mongoUtil.stories();
	var fieldDetails = req.query;
	var modifiedStoryName = fieldDetails.modifiedStoryName;
	var modifiedComponentName = fieldDetails.modifiedComponentName;

	// same as db.stories.findOne({name: "Story 1"}).components.length;
	stories.find(
		{
			modifiedName: fieldDetails.modifiedStoryName
		}
	).limit(1).toArray(function(err, doc) {

		if (err) {
			res.sendStatus(400);
		}

		// find the number of fields existing already
		var fieldsObj = (doc[0].components[parseInt(fieldDetails.componentIndex)].fields);

		// set the field order to be at the end by default based on the number of existing fields
		if (fieldsObj) {
			fieldDetails.order = Object.keys(fieldsObj).length + 1;
		} else {
			fieldsObj = {};
			fieldDetails.order = 1;
		}

		// if options, separate by comma and remove all spaces
		fieldDetails.options = fieldDetails.options.replace(/ /g, '');
		fieldDetails.options = fieldDetails.options.split(',');

		// remove details that we don't want saved
		fieldDetails['inputName'] = fieldDetails.modifiedFieldName;
		fieldDetails['label'] = fieldDetails.fieldName;
		fieldDetails['fieldset'] = fieldDetails.modifiedFieldsetName;
		fieldDetails['type'] = fieldDetails.fieldType;
		fieldsObj[fieldDetails.modifiedFieldName] = fieldDetails;
		delete fieldDetails.modifiedStoryName;
		delete fieldDetails.story;
		delete fieldDetails.componentIndex;
		delete fieldDetails.component;
		delete fieldDetails.instanceName;
		delete fieldDetails.modifiedComponentName;
		delete fieldDetails.modifiedInstanceName;
		delete fieldDetails.modifiedFieldsetName;
		delete fieldDetails.modifiedFieldName;
		delete fieldDetails.fieldsetName;
		delete fieldDetails.fieldName;
		delete fieldDetails.fieldType;

		stories.update(
			{
				modifiedName: modifiedStoryName,
				"components.modifiedComponentName": modifiedComponentName
			},
			{
				$set: {
					"components.$.fields": fieldsObj
				}
			},
			function(err, saved) {
				if (err || !saved) res.sendStatus(400);
				res.json({success: true});
			}
		);

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