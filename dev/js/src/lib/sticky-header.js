/* globals WebKitCSSMatrix */
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define(['src/lib/broadcast'], function (broadcast) {
	var ee = broadcast.instance();
	var elSelector = '#headersticky';
	var element = document.querySelector(elSelector);

	if (!element) {
		return true;
	}

	var elHeight = 0;
	var elTop = 0;
	var dHeight = 0;
	var wHeight = 0;
	var wScrollCurrent = 0;
	var wScrollBefore = 0;
	var wScrollDiff = 0;
	var first = true;
	var matrix;

	// https://developer.mozilla.org/nl/docs/Web/CSS/transform-function
	function updateMatrix(y) {
		// m.translate(0, y, 0);
		// m.m24 = y;
		// console.info(m.toString());
		// return m.toString();
		// a1 a2 a3 a4
		// b1 b2 b3 b4
		// c1 c2 c3 c4
		// d1 d2 d3 d4
		//
		// a c 0 tx
		// b d 0 ty
		// 0 0 1 0
		// 0 0 0 1
		// matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)
		//
		// a c ty
		// b d tx
		// 0 0 1
		return ['matrix(1, 0, 0, 1, 0, ', y, ')'].join('');
	}

	function getMatrix(s) {
		return s.slice(7, -1).split(/,\s?/).map(function (v) {
			return Number(v);
		});
	}

	function onScroll() {
		elHeight = element.offsetHeight;
		dHeight = document.body.offsetHeight;
		wHeight = window.innerHeight;
		wScrollCurrent = window.pageYOffset;
		wScrollDiff = wScrollBefore - wScrollCurrent;
		matrix = getMatrix(window.getComputedStyle(element).getPropertyValue('transform'));
		elTop = matrix[5] + wScrollDiff;
		if (wScrollCurrent <= 0 || first) {
			element.style.transform = updateMatrix(0);
			first = false;
		} else if (wScrollDiff > 0) {
			element.style.transform = updateMatrix(elTop > 0 ? 0 : elTop);
		} else if (wScrollDiff < 0) {
			if (wScrollCurrent + wHeight >= dHeight - elHeight) {
				element.style.transform = updateMatrix((elTop = wScrollCurrent + wHeight - dHeight) < 0 ? elTop : 0);
			} else {
				element.style.transform = updateMatrix(Math.abs(elTop) > elHeight ? -elHeight : elTop);
			}
		}
		wScrollBefore = wScrollCurrent;
	}

	element.style.transform = updateMatrix(0);
	window.addEventListener('scroll', onScroll);

	// m = addEventListener || removeEventListener
	ee.on('menu.navega', function (m) {
		first = true;
		window[m]('scroll', onScroll);
	});
});
