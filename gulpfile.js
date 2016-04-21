'use strict';

const gulp = require('gulp');

const almond = require('./gulp/almond');
const jade = require('./gulp/jade');
const stylus = require('./gulp/stylus');

gulp.task('default', gulp.parallel(
	jade.task,
	stylus.task
));

gulp.task('build', gulp.series(
	'default',
	almond.almondTask
));

gulp.task('watch', gulp.parallel(
	'default',
	jade.watch,
	stylus.watch
));
