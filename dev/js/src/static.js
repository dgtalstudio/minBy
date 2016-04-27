/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'svgLocalstorage',
	'src/lib/promise'
], function (svgLocalstorage) {
	svgLocalstorage('images/sprite.svg', 'svg-1.0.11')
		.then(function (svg) {
			document.body.insertAdjacentHTML('afterbegin', svg);
		});
});
