'use strict';

const join = require('path').join;
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const watch = require('./helpers/watch');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const stylusPath = join(__dirname, '..', 'stylus');
const outPath = join(__dirname, '..', isDev ? 'dev' : 'public', 'css');

function css() {
	return gulp
		.src(join(stylusPath, 'app.styl'))
		.pipe(stylus({
			compress: !isDev
		}))
		.pipe(postcss([
			autoprefixer({
				browsers: ['last 2 versions']
			})
		]))
		.pipe(gulp.dest(outPath));
}

function watchCss() {
	return watch(join(stylusPath, '**/*.styl'), css);
}

exports.task = css;
exports.watch = watchCss;
