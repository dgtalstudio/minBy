/* eslint camelcase: 0 */
/* eslint no-unused-expressions: 0 */
'use strict';

({
	almond: {
		options: {
			optimize: 'uglify2',
			uglify2: {
				warnings: false,
				compress: {
					sequences: true,
					properties: true,
					drop_debugger: true,
					unused: true,
					drop_console: true
				}
			},
			optimizeCss: 'none',
			generateSourceMaps: true,
			useSourceUrl: false,
			removeCombined: true,
			keepAmdefine: false,
			cjsTranslate: false,
			preserveLicenseComments: false,
			findNestedDependencies: true,
			useStrict: true,
			baseUrl: 'js',
			mainConfigFile: 'js/config.js',
			name: '../node_modules/almond/almond',
			include: ['./app'],
			out: '../public/js/app.min.js'
		}
	}
});
