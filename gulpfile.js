/**
 * Gulpfile for compilation of Sass
 */

'use strict';

/**
 * Dependencies
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var karmaServer = require('karma').Server;
var open = require('gulp-open');
var util = require('gulp-util');
var color = require('gulp-color');
var clean = require('gulp-clean');

/**
 * Variables
 */
var testReportUrl = './testing/reports/report.html';

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
	watch('css/**/*.scss', function() {
		gulp.start('sass');
	});
});

/**
 * Task to fire up Karma Testing Server and run tests
 */
gulp.task('run-tests', ['delete-report'], function(done) {
	return new karmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function() {
		done(); // console stacktrace if not in anon func
	}).start();
});

/**
 * Task to simply open Jasmine HTML report in default browser
 */
gulp.task('open-report', function() {
	gulp.src(testReportUrl)
		.pipe(open());
});

/** Task to open Jasmine HTML report after running tests */
gulp.task('run-tests-then-open-report', ['run-tests'], function() {
	gulp.src(testReportUrl)
		.pipe(open());
});

/**
 * Task to run tests then show the report if -r or --show-report flag added
 */
gulp.task('test', function() {

	// check if flags present
	if (Object.keys(util.env).length > 1) {

		// if flags to show report are present
		if(util.env['show-report'] || util.env['r']) {
			gulp.start('run-tests-then-open-report');
		} else {
			console.log(color('\nERROR:\n\nWith the "gulp test" command please only use a flag of either "--show-report" or "-r" to open an HTML version of the report rather than just seeing the results in the command line.\n', 'RED'));
		}

	} else {
		gulp.start('run-tests');
	}
});

/**
 * Task to delete test reports
 */
gulp.task('delete-report', function() {
	return gulp.src(testReportUrl)
		.pipe(clean());
});

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
	/*console.log(color('"gulp run-tests"', 'YELLOW'));
		console.log('Task to run automation tests (unpreferred; long way)\n');
	console.log(color('"gulp open-report"', 'YELLOW'));
		console.log('Task to simply show the test report from the last tests run\n');
	console.log(color('"gulp run-tests-then-open-report"', 'YELLOW'));
		console.log('Task to run automation tests and then open the test report (unpreferred; long way)\n');*/
	console.log(color('"gulp test"', 'YELLOW'));
		console.log('Task to run automation tests and optionally open the test report');
		console.log('    (no flag)       run tests only (reports in cmd only)');
		console.log('    -r              open HTML report after running tests');
		console.log('    -show-report    open HTML report after running tests');
	console.log('\n');
});