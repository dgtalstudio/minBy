'use strict';

const join = require('path').join;
const gulp = require('gulp');

const imagePath = join(__dirname, '..', 'dev', 'images');
const outPath = join(__dirname, '..', 'public', 'images');

function copy() {
	return gulp
		.src(join(imagePath, '/**/*'))
		.pipe(gulp.dest(outPath));
}

exports.task = copy;
