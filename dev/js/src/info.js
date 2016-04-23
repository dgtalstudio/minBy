/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */

'use strict';

define([
	'src/lib/broadcast',
	'utils'
], function (broadcast, utils) {
	var ee = broadcast.instance();
	var contentInfo = utils.qS('#contentInfo');
	function init() {
		ee.emit('info.load');
	}
	return init;
});
