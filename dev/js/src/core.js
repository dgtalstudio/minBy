/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'growl',
	'svgLocalstorage',
	'src/lib/broadcast',
	'src/info',
	'src/form',
	'src/roteiro',
	'src/maps',
	'src/lib/promise'
], function (growl, svgLocalstorage, broadcast, info, form) {
	var ee = broadcast.instance();
	svgLocalstorage('images/sprite.svg', 'svg-1.0.12')
		.then(function (svg) {
			document.body.insertAdjacentHTML('afterbegin', svg);
		});

	ee.on('info.load', function () {
		ee.emit('roteiro.init');
	});

	info();
});
