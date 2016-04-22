/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define([], function () {
	var html = document.documentElement;
	var body = document.body;
	var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

	function getScrollY() {
		return window.pageYOffset || isCSS1Compat ? html.scrollTop : body.scrollTop;
	}

	function getDocHeight() {
		return Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
	}

	function getPoints(p) {
		return Array.prototype.slice.call(p.points)
			.map(function (o) {
				return [o.x, o.y];
			})
			.reduce(function (a, b) {
				return a.concat(b);
			});
	}

	function convertToPoints(arr, el) {
		var points = [];
		var cp = Array.prototype.slice.call(arr);
		while (cp.length > 0) {
			points.push(cp.splice(0, 2).join(','));
		}
		el.setAttribute('points', points.join(' '));
	}

	function fillPoints(selector) {
		var arr = [];
		var list = document.querySelectorAll(selector);
		Array.from(list).forEach(function (el) {
			arr.push(getPoints(el));
		});
		return arr;
	}

	return {
		getScrollY: getScrollY,
		getDocHeight: getDocHeight,
		getPoints: getPoints,
		convertToPoints: convertToPoints,
		fillPoints: fillPoints
	};
});
