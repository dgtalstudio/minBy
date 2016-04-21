'use strict';

const join = require('path').join;
const gulp = require('gulp');
const jade = require('gulp-jade');
const watch = require('./helpers/watch');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const jadePath = join(__dirname, '..', 'jade');
let outPath = join(__dirname, '..');

if (isDev === false) {
	outPath = join(outPath, 'public');
}

function template() {
	return gulp
		.src(join(jadePath, 'index.jade'))
		.pipe(jade({
			locals: {isDev}
		}))
		.pipe(gulp.dest(outPath));
}

function watchTemplate() {
	return watch(join(jadePath, '**/*.jade'), template);
}

exports.task = template;
exports.watch = watchTemplate;
