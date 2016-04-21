/* eslint prefer-arrow-callback: 0 */
/* eslint no-var: 0 */
/* eslint prefer-reflect: 0 */
/* eslint babel/object-shorthand: 0 */
/* eslint prefer-template: 0 */
'use strict';

define([
	'eventEmitter'
], function (EventEmitter) {
	return {
		instance: (function () {
			var singleton;
			return function () {
				if (!singleton) {
					singleton = new EventEmitter();
				}
				return singleton;
			};
		})()
	};
});
