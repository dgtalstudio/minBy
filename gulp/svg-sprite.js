/* eslint quote-props:0 */
'use strict';

const join = require('path').join;
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const watch = require('./helpers/watch');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const svgPath = join(__dirname, '..', 'dev', 'svg');
const outPath = join(__dirname, '..', isDev ? 'dev' : 'public', 'images');

const options = {
	mode: {
		symbol: {
			dest: './',
			sprite: 'sprite.svg',
			example: false
		}
	},
	svg: {
		xmlDeclaration: false,
		doctypeDeclaration: false,
		namespaceClassnames: false,
		rootAttributes: {
			width: 0,
			height: 0,
			display: 'none',
			version: '1.1',
			'aria-hidden': 'true'
		}
	},
	shape: {
		id: {
			separator: '_'
		},
		dimension: {
			precision: 2
		}
	}
};

function sprite() {
	return gulp
		.src(join(svgPath, '**/*.svg'))
		.pipe(svgSprite(options))
		.pipe(gulp.dest(outPath));
}

function watchSprite() {
	return watch(join(svgPath, '**/*.svg'), sprite);
}

exports.task = sprite;
exports.watch = watchSprite;
