/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */

'use strict';

define([
	'src/lib/broadcast',
	'src/helpers/poly',
	'utils',
	'TweenMax',
	'TimelineLite'
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

	function polyTween(a, b, el, d) {
		d = d || 1;
		b.onUpdate = function () {
			helper.convertToPoints(a, el);
		};
		return Tween.to(a, d, b);
	}

	function createTweenInstance(list, el) {
		var instances = [];
		for (var i = 1; i < list.length; i++) {
			instances.push(polyTween(list[0], list[i], el));
		}
		return instances;
	}

	function updateInfo() {
		console.log('updateInfo', Number(tl.progress().toFixed(2)), tl.duration());
	}

	function roteiro() {
		var ticking = false;
		var bg;
		var logo;
		var slogan;
		var polys;
		var poly;
		var pointsAnimation = {};
		var polyInstancesWhite;
		var polyInstancesRed;

		// Elements
		bg = utils.qS('#bg');
		polys = utils.qS('#polys');
		poly = {
			white: utils.qS('#white0'),
			red: utils.qS('#red0')
		};
		logo = utils.qS('#logo');
		slogan = utils.qS('#slogan');
		tl = new Timeline({
			onUpdate: updateInfo,
			paused: true
		});

		// Points
		pointsAnimation.white = helper.fillPoints('#polys > .poly--white');
		pointsAnimation.red = helper.fillPoints('#polys > .poly--red');

		// Tween Instances
		polyInstancesWhite = createTweenInstance(pointsAnimation.white, poly.white);
		polyInstancesRed = createTweenInstance(pointsAnimation.red, poly.red);

		tl
			.add(polyInstancesWhite[0])
			.add([polyInstancesWhite[1], Tween.to(logo, 1, {opacity: 0})])
			.add(polyInstancesWhite[2])
			.add(polyInstancesWhite[3])
			.add([polyInstancesRed[0], Tween.to(slogan, 1.5, {x: '-200%'})])
			.add([polyInstancesRed[1], Tween.to(slogan, 1.5, {y: '-100%'})])
			.set([bg, polys, logo, slogan], {display: 'none'})
			.to(bg, 7, {y: '-20vh'}, 0)
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
