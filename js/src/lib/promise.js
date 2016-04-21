/* eslint no-var: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */

'use strict';

define([
	'vendor/pinkie/index'
], function (PromisePinkie) {
	if ('Promise' in window === false) {
		window.Promise = PromisePinkie;
	}
});
