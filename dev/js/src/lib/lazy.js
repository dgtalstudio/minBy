/* globals google */
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define(['src/lib/promise'], function () {
	var h = document.getElementsByTagName('head')[0];

	function addScript(src) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = src;
		h.insertBefore(s, h.lastChild);
		return new Promise(function (resolve, reject) {
			s.onload = resolve;
		});
	}

	return addScript;
});
