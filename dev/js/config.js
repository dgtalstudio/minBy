/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
'use strict';

requirejs.config({
	baseUrl: 'js',
	paths: {
		eventEmitter: '../node_modules/wolfy87-eventemitter/EventEmitter',
		jquery: '../node_modules/jquery/src'
	},
	map: {
		'jquery/selector': {
			'jquery/selector-sizzle': 'jquery/selector-native'
		}
	}
});
