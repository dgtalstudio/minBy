/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */

'use strict';

define([
	'src/lib/broadcast',
	'utils',
	'TweenLite',
	'CSSPlugin'
], function (broadcast, utils, Tween) {
	var ee = broadcast.instance();
	// var icons = document.querySelectorAll('.icon__feature--center');
	// Array.prototype.forEach.call(icons, function (icon) {
	// 	Tween.set(icon, {
	// 		transformOrigin: '50% 50%',
	// 		scale: 0.5
	// 		// position: 'absolute',
	// 		// x: '50%',
	// 		// y: '50%',
	// 		// left: '50%'
	// 	});
	// });

	function init() {
		ee.emit('info.load');
	}
	return init;
});
