/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'svgLocalstorage',
	'src/lib/broadcast',
	'src/info',
	'src/roteiro',
	'src/lib/promise',
	'./maps'
], function (svgLocalstorage, broadcast, info) {
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
