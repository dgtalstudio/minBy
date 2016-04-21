'use strict';

const logger = require('gulplog');
const promisify = require('lagden-promisify');
const join = require('path').join;
const exec = promisify(require('child_process').exec);
const pwd = join(__dirname, '..');

function almond() {
	return exec(join(pwd, 'npm run build')).then(r => {
		logger.info(r);
	});
}

exports.almondTask = almond;
