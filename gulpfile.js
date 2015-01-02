'use strict';

var gulp = require('gulp'),
	bowerFiles = require('main-bower-files'),
	inject = require('gulp-inject');

var paths = {
	app: 'app'
};

gulp.task('index', function(){

	gulp.src( paths.app + '/index.html' )
		.pipe(inject( gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
		.pipe(inject( gulp.src(paths.app + '/css/**/*.css', {read: false}), {name: 'styles', relative: true}))
		.pipe(inject( gulp.src(paths.app + '/js/**/*.js', {read:false}), {name: 'scripts', relative: true}))
		.pipe( gulp.dest(paths.app) );

});