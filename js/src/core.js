/* eslint no-var: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'jquery/event',
	'src/lib/promise'
], function ($) {
	var $xxx = $('#xxx');
	$xxx.on('click', function () {
		console.log("click!");
	});
});
