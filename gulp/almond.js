'use strict';

const join = require('path').join;
const cpExec = require('child_process').exec;
const logger = require('gulplog');
const promisify = require('lagden-promisify');

const exec = promisify(cpExec);
const pwd = join(__dirname, '..');

function almond() {
	return exec(join(pwd, 'bin/build')).then(r => {
		logger.info(r);
	});
}

exports.task = almond;
