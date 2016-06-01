/**
 * Gulpfile for compilation of Sass
 */

'use strict';

/* ************************************************************************** */

/* GULP CONFIG */

/**
 * Dependencies
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var karmaServer = require('karma').Server;
var open = require('gulp-open');
var color = require('gulp-color');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var yargs = require('yargs').argv;
var confirm = require('gulp-confirm');
var expect = require('gulp-expect-file');
var spawn = require('child_process').spawn;
var node;

/**
 * Variables
 */
var serverConfigFilePath = 'server/config/server.js';
var dbSeedFilePath = 'server/database/data/stories/stories-seed.json';
var unitTestReportUrl = './testing/reports/unit/unit-test-report.html';
var e2eTestReportUrl = './testing/reports/e2e/e2e-test-report.html';

/* ************************************************************************** */

/* APP SETUP */

/**
 * Task to start app server
 */
/*gulp.task('start-app-server', shell.task([
	'node ' + serverConfigFilePath
]));*/
gulp.task('start-app-server', function() {
	if (node) node.kill();
	node = spawn('node', [serverConfigFilePath], {stdio: 'inherit'});
	node.on('close', function(code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});

/**
 * Task to start app server then restart if changes to server config
 */
gulp.task('watch-app-server', ['start-app-server'], function() {
	watch(serverConfigFilePath, function() {
		gulp.start('start-app-server');
	});
});

/**
 * Task to start servers for app, testing and database
 */
gulp.task('start', function() {

	var noOfArgs = Object.keys(yargs).length;
	var flagErrorMsg = '\nERROR:\n\nWith the "gulp start" command please only use a flag of "-d", "-a" or "-e" to run the database, app and e2e test servers respectively.\n';

	// check if one flag present (other than _ and $0)
	if (noOfArgs > 2 && noOfArgs < 4) {

		switch (true) {
			case (typeof yargs.d !== 'undefined'):
				gulp.start('start-db-server');
				break;
			case (typeof yargs.a !== 'undefined'):
				gulp.start('start-app-server');
				break;
			case (typeof yargs.e !== 'undefined'):
				gulp.start('start-e2e-test-server');
				break;
			default:
				// if incorrect flags provided show error msg
				console.log(color(flagErrorMsg, 'RED'));
		}

	// if wrong number of flags provided show error msg
	} else {
		console.log(color(flagErrorMsg, 'RED'));
	}
});

/* ************************************************************************** */

/* STYLES */

/**
 * Task to compile Sass
 */
gulp.task('sass', function() {
	return gulp.src('./app/css/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css'));
});

/**
 * Task to watch for changes in Sass files and trigger the Sass compilation
 */
gulp.task('watch-css', function() {
	watch(['app/css/**/*.scss', 'bower_components/**/*.scss'], function() {
		gulp.start('sass');
	});
});

/* ************************************************************************** */

/* UNIT TESTING */

/**
 * Task to fire up Karma Testing Server and run unit tests
 */
gulp.task('run-unit-tests', ['delete-unit-test-report'], function(done) {
	return new karmaServer({
		configFile: __dirname + '/testing/tests/unit/karma.conf.js',
		singleRun: true
	}, function() {
		done(); // console stacktrace if not in anon func
	}).start();
});

/**
 * Task to simply open Jasmine HTML unit test report in default browser
 */
gulp.task('open-unit-test-report', function() {
	gulp.src(unitTestReportUrl)
		.pipe(open());
});

/**
 * Task to open Jasmine HTML report after running unit tests
 */
gulp.task('run-unit-tests-then-open-unit-test-report', ['run-unit-tests'], function() {
	gulp.src(unitTestReportUrl)
		.pipe(open());
});

/**
 * Task to delete unit test reports
 */
gulp.task('delete-unit-test-report', function() {
	return gulp.src(unitTestReportUrl)
		.pipe(clean());
});

/* ************************************************************************** */

/* E2E TESTING */

/**
 * Task to start the e2e testing server
 */
gulp.task('start-e2e-test-server', shell.task([
	'webdriver-manager start'
]));

/**
 * Task to run e2e tests
 */
gulp.task('run-e2e-tests', function() {
	var protractorConfigFilePath = 'testing/tests/e2e/conf.js';
	var protractorCmd = 'protractor ' + protractorConfigFilePath;

	return gulp.src(protractorConfigFilePath, {read: false})
		.pipe(shell([
			protractorCmd
		]))
});

/**
 * Task to open e2e test report
 */
gulp.task('open-e2e-test-report', function() {
	gulp.src(e2eTestReportUrl)
		.pipe(open());
});

/**
 * Task to open Protractor HTML report after running e2e tests
 */
gulp.task('run-e2e-tests-then-open-e2e-test-report', ['run-e2e-tests'], function() {
	gulp.src(e2eTestReportUrl)
		.pipe(open());
});

/* ************************************************************************** */

/* TEST COMMANDS */
/* (PUBLIC FACING IN HELP, SHORTHAND AND INTENDED FOR USE) */

/**
 * Task (shorthand) to handle all testing based on flags passed
 */
gulp.task('test', function() {

	// check if flags present (other than _ and $0)
	if (Object.keys(yargs).length > 2) {

		// if u flag run unit tests with / without showing report based on r flag
		if (yargs.u) {
			if (yargs.r) {
				gulp.start('run-unit-tests-then-open-unit-test-report');
			} else {
				gulp.start('run-unit-tests');
			}
		}

		// if e flag run e2e tests with / without showing report based on r flag
		if (yargs.e) {
			if (yargs.r) {
				gulp.start('run-e2e-tests-then-open-e2e-test-report');
			} else {
				gulp.start('run-e2e-tests');
			}
		}

		// catch error if flags are supplied but neither u or e
		if (!yargs.u && !yargs.e) {
			console.log(color('\nERROR:\n\nWith the "gulp test" command please only use a flag of "-u" or "-e" to run unit tests or run e2e tests respectively.\n', 'RED'));
		}

	// run both unit and e2e tests
	} else {
		console.log(color('\nERROR:\n\nWith the "gulp test" command please only use a flag of "-u", "-e" or "-r" to run unit tests, run e2e tests and open an HTML version of the report rather than just seeing the results in the command line respectively.\n', 'RED'));
	}
});

/* ************************************************************************** */

/* DATABASE HANDLING */

/**
 * Task to start the mongoDB server
 */
gulp.task('start-db-server', shell.task([
	'mongod'
]));

/**
 * Task to backup the Database to a seed file
 */
gulp.task('backup-db', shell.task([
	'mongoexport --db tails --collection stories --type json --out ' + dbSeedFilePath + ' --jsonArray --pretty'
]));

/**
 * Task to import data into database from seed file
 */
gulp.task('import-db', function() {
	return gulp.src(dbSeedFilePath)
		.pipe(expect(dbSeedFilePath))
		.pipe(confirm({
			question: 'Are you sure you want to import this database? All existing stories and data will be lost! (y/n)',
			input: '_key:y'
		}))
		.pipe(shell([
			'mongoimport --db tails --collection stories --type json --file ' + dbSeedFilePath + ' --jsonArray --drop'
		]));
});

/**
 * Task to reset the database to it's initial state
 */
gulp.task('reset-db', shell.task([
	'sh server/database/scripts/reset-db.sh'
]));

/* ************************************************************************** */

/* HELP */

/**
 * Task to list functions that can be run by gulp
 */
gulp.task('help', function() {
	console.log(color('\nGULP HELP FOR APP', 'GREEN'));
	console.log(color('=================\n', 'GREEN'));
	console.log(color('"gulp start"', 'YELLOW'));
		console.log('Task to start servers');
		console.log('    -d    start database (mongo) server');
		console.log('    -a    start app server');
		console.log('    -e    start e2e test server\n');
	console.log(color('"gulp sass"', 'YELLOW'));
		console.log('Task to compile styles\n');
	console.log(color('"gulp watch-css"', 'YELLOW'));
		console.log('Task to watch for changes and compile styles when changes found\n');
	console.log(color('"gulp watch-app-server"', 'YELLOW'));
		console.log('Task to watch for changes to server config and restart the app server when changes made. Should be run when developing only, making changes to server.js file\n');
	console.log(color('"gulp test"', 'YELLOW'));
		console.log('Task to run automation tests and optionally open the test report');
		console.log('    -u    run unit tests');
		console.log('    -e    run e2e tests');
		console.log('    -r    open HTML report after running tests');
		console.log('You can pass >1 flag by chaining or separating them:');
		console.log('"gulp test -u -e -r"    This will run both types of tests and show reports');
		console.log('"gulp test -uer"        Does the same as the above command\n')
	console.log(color('"gulp backup-db"', 'YELLOW'));
		console.log('Task to backup data stored in the local database into a seed file\n');
	console.log(color('"gulp import-db"', 'YELLOW'));
		console.log('Task to import data stored in a seed file into the local database\n');
	console.log(color('"gulp reset-db"', 'YELLOW'));
		console.log('Task to delete all data in the local database to reset to initial state\n');
	console.log('\n');
});