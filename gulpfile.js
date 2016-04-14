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