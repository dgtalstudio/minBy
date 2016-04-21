/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'jquery/event',
	'src/lib/broadcast',
	'src/lib/promise'
], function ($, broadcast) {
	var $xxx = $('#xxx');
	var ee = broadcast.instance();

	function testPromise() {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				resolve('yeaahh!!');
			}, 3000);
		});
	}

	ee.on('awesome', function (dados) {
		$xxx[0].textContent = dados;
	});

	$xxx.on('click', function () {
		ee.emit('awesome', 'clicaram aqui!!');
		testPromise()
			.then(function (r) {
				ee.emit('awesome', r);
			});
	});
});
