/* globals google */
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define(function () {
	var h = document.getElementsByTagName('head')[0];

	function addScript(src, cb) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = src;
		if (cb) {
			s.onload = cb;
		}
		h.insertBefore(s, h.lastChild);
	}

	return addScript;
});
