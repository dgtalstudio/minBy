/* eslint prefer-arrow-callback: 0 */
'use strict';

requirejs.config({
	baseUrl: 'js',
	paths: {
		npm: '../node_modules',
		jquery: 'npm/jquery/src'
	},
	map: {
		'jquery/selector': {
			'jquery/selector-sizzle': 'jquery/selector-native'
		}
	}
});
