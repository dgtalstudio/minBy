/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define([
	'src/lib/broadcast',
	'src/helpers/poly',
	'utils',
	'TweenLite',
	'TimelineLite',
	'CSSPlugin',
	'EndArrayPlugin'
], function (broadcast, helper, utils, Tween, Timeline) {
	var ee = broadcast.instance();
	var scrollSize = utils.qS('#scrollSize');
	var size = (scrollSize) ? scrollSize.getBoundingClientRect().height : 1000;
	var tl;

	function updateScrollHandler(event) {
		var winHeight = window.innerHeight;
		var scrollY = helper.getScrollY();
		var scrollPercent = scrollY / (size - winHeight);
		var progress = scrollPercent >= 0 ? scrollPercent : 0;
		tl.progress(progress, false).pause();
	}

	function updateArray(a, el) {
		helper.convertToPoints(a, el);
	}

	function polyTween(a, b, el, d) {
		d = d || 1;
		return Tween.to(a, d, {
			endArray: b,
			onUpdate: updateArray,
			onUpdateParams: [a, el]
		});
	}

	function createTweenInstance(list, el) {
		var instances = [];
		for (var i = 1; i < list.length; i++) {
			instances.push(polyTween(list[0], list[i], el));
		}
		return instances;
	}

	function roteiro() {
		var ticking = false;
		var bg;
		var arrow;
		var logo;
		var logoArrow;
		var slogan;
		var polys;
		var poly;
		var pointsAnimation = {};
		var polyInstancesWhite;
		var polyInstancesRed;
		var arrowTween;

		// Elements
		bg = utils.qS('#bg');
		polys = utils.qS('#polys');
		poly = {
			white: utils.qS('#white0'),
			red: utils.qS('#red0')
		};
		logoArrow = utils.qS('#logoArrow');
		logo = utils.qS('#logo');
		arrow = utils.qS('#arrowDownIco');
		slogan = utils.qS('#slogan');

		// Points
		pointsAnimation.white = helper.fillPoints('#polys > .poly--white');
		pointsAnimation.red = helper.fillPoints('#polys > .poly--red');

		// Tween Instances
		polyInstancesWhite = createTweenInstance(pointsAnimation.white, poly.white);
		polyInstancesRed = createTweenInstance(pointsAnimation.red, poly.red);

		tl = new Timeline({
			paused: true
		});

		tl
			.to(arrow, 1, {y: '+=300', force3D: true})
			.set(arrow, {display: 'none'})
			.set(poly.red, {opacity: 0.8})
			.add(polyInstancesWhite[0])
			.add(polyInstancesWhite[1])
			.add([polyInstancesWhite[2], polyInstancesRed[0]])
			.add([polyInstancesRed[1], Tween.to(slogan, 1.5, {x: '-250%'})])
			.add(Tween.to(poly.red, 1.5, {opacity: 1}))
			.set([logoArrow, bg, polys], {display: 'none'})
		;

		window.addEventListener('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(function () {
					updateScrollHandler();
					ticking = false;
				});
			}
			ticking = true;
		});

		updateScrollHandler();
	}

	ee.on('roteiro.init', function () {
		roteiro();
	});
});
