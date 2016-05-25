"use strict";

var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db; // underscore might be ES2015 for exclusive to this module

module.exports = {
	connect() {
		client.connect('mongodb://localhost:27017/tails', function(err, db) {
			if (err) {
				console.log("Error connecting to Mongo - check mongod connection");
				process.exit(1); // stops node
			}
			_db = db;
			console.log("Connected to Mongo");
		});
	},
	stories() {
		return _db.collection('stories');
	}
};