/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
'use strict';

requirejs.config({
	baseUrl: 'js',
	paths: {
		eventEmitter: '../node_modules/wolfy87-eventemitter/EventEmitter',
		svgLocalstorage: '../node_modules/svg-localstorage/svg-localstorage',
		utils: '../node_modules/lagden-utils/dist/index',
		TweenLite: '../node_modules/gsap/src/uncompressed/TweenLite',
		TimelineLite: '../node_modules/gsap/src/uncompressed/TimelineLite',
		CSSPlugin: '../node_modules/gsap/src/uncompressed/plugins/CSSPlugin'
	}
});
