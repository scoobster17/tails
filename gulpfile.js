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
 * Task to open Jasmine HTML report in default browser
 */
gulp.task('show-report', function() {
	gulp.src('./testing/app-test-reports/story-app-tests.html')
		.pipe(open());
});

/**
 * Task to fire up Karma Testing Server
 */
gulp.task('test', function(done) {
	return new karmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});