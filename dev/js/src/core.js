/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'svgLocalstorage',
	'src/lib/broadcast',
	'src/lib/promise',
	'src/scroll'
], function (svgLocalstorage, broadcast) {
	var ee = broadcast.instance();
	svgLocalstorage('images/sprite.svg', 'svg-1.0.4')
		.then(function (svg) {
			document.body.insertAdjacentHTML('afterbegin', svg);
			ee.emit('scroll.init');
		});
});
