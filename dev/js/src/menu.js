/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'src/lib/broadcast',
	'utils',
	'TweenLite',
	'CSSPlugin',
	'ScrollToPlugin'
], function (broadcast, utils, Tween) {
	var menu = utils.qS('#menu');
	var menuNav = utils.qS('#menuNav');
	var hamburguer = utils.qS('#hamburguer');
	var obfuscator = utils.qS('#obfuscator');

	function onToggle(event, method) {
		var m = event ? event.currentTarget.dataset.method : method || 'remove';
		menu.classList[m]('menu--open');
		obfuscator.classList[m]('obfuscator--visible');
	}

	function bubbling(target, selector) {
		if (!target) {
			return false;
		}
		if (target.matches(selector)) {
			return target;
		}
		return bubbling(target.parentElement, selector);
	}

	function nav(event) {
		var t = bubbling(event.target, '.menuLista__item');
		if (t) {
			event.preventDefault();
			var go = utils.qS(t.hash);
			if (go) {
				onToggle(null);
				Tween.to(window, 3, {
					scrollTo: {
						y: go.offsetTop
					}
				});
			}
		}
	}

	hamburguer.addEventListener('click', onToggle);
	obfuscator.addEventListener('click', onToggle);
	menuNav.addEventListener('click', nav);
});
