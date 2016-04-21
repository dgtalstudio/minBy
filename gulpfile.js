'use strict';

const gulp = require('gulp');

const almond = require('./gulp/almond');
const symlink = require('./gulp/symlink');
const jade = require('./gulp/jade');
const stylus = require('./gulp/stylus');

gulp.task('default', gulp.parallel(
	symlink.task,
	jade.task,
	stylus.task
));

gulp.task('watch', gulp.parallel(
	'default',
	jade.watch,
	stylus.watch
));

gulp.task('build', gulp.series(
	'default',
	almond.task
));
