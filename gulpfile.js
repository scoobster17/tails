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

/**
 * Variables
 */
var unitTestReportUrl = './testing/reports/unit/unit-test-report.html';
var e2eTestReportUrl = './testing/reports/e2e/e2e-test-report.html';

/* ************************************************************************** */

/* STYLES */

/**
 * Task to compile Sass
 */
gulp.task('sass', function() {
	return gulp.src('./css/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

/**
 * Task to watch for changes in Sass files and trigger the Sass compilation
 */
gulp.task('watch', function() {
	watch(['css/**/*.scss', 'bower_components/**/*.scss'], function() {
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
		configFile: __dirname + '/karma.conf.js',
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

/* DATABASE BACKUP */

gulp.task('bdb', shell.task([
	'mongoexport --db tails --collection stories --out data/stories/stories.json --jsonArray --pretty'
]));

/* ************************************************************************** */

/* HELP */

/**
 * Task to list functions that can be run by gulp
 */
gulp.task('help', function() {
	console.log(color('\nGULP HELP FOR APP', 'GREEN'));
	console.log(color('=================\n', 'GREEN'));
	console.log(color('"gulp sass"', 'YELLOW'));
		console.log('Task to compile styles\n');
	console.log(color('"gulp watch"', 'YELLOW'));
		console.log('Task to watch for changes and compile styles when changes found\n');
	console.log(color('"gulp test"', 'YELLOW'));
		console.log('Task to run automation tests and optionally open the test report');
		console.log('    -u    run unit tests');
		console.log('    -e    run e2e tests');
		console.log('    -r    open HTML report after running tests');
		console.log('You can pass >1 flag by chaining or separating them:');
		console.log('"gulp test -u -e -r"    This will run both types of tests and show reports');
		console.log('"gulp test -uer"        Does the same as the above command')
	console.log('\n');
});