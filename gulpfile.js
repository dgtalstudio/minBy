'use strict';

const gulp = require('gulp');

const cp = require('./gulp/cp');
const almond = require('./gulp/almond');
const symlink = require('./gulp/symlink');
const jade = require('./gulp/jade');
const stylus = require('./gulp/stylus');
const svgSprite = require('./gulp/svg-sprite');

gulp.task('default', gulp.parallel(
	symlink.task,
	jade.task,
	stylus.task,
	svgSprite.task
));

gulp.task('watch', gulp.parallel(
	'default',
	jade.watch,
	stylus.watch,
	svgSprite.watch
));

gulp.task('build', gulp.series(
	'default',
	almond.task,
	cp.task.bind(cp, 'images/**/*', 'images'),
	cp.task.bind(cp, 'composer.json', '.'),
	cp.task.bind(cp, '*.php', '.'),
	cp.task.bind(cp, 'vendor/**/*', 'vendor')
));
