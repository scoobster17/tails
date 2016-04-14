/**
 * Server.js
 *
 * Starts a node server to supply resources and data
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
 * Supply pages to URLs
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
 * Server setup and config
 */
var server = app.listen(7411, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Tails app listening @ http://%s:%s", host, port);

});