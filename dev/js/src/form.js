/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define([
	'growl',
	'formValidation',
	'src/lib/xhr',
	'src/lib/promise'
], function (growl, FormValidation, xhr) {
	function invalidForm(invalid) {
		invalid.forEach(function (o) {
			growl().notifica(o.title, o.msg, 'theNotification--theme-red');
		});
	}

	var contato = new FormValidation('#contatoFrm', {
		invalid: invalidForm,
		submit: function (frm) {
			xhr
				.post(frm.action, frm, {
					'X-Requested-With': 'minByXMLHttpRequest'
				})
				.then(function (r) {
					return JSON.parse(r);
				})
				.then(function (r) {
					if (r.success) {
						frm.classList.remove('submitted');
						frm.reset();
						growl().notifica('Aviso', r.message, 'theNotification--theme-green');
					} else {
						growl().notifica('Aviso', r.message, 'theNotification--theme-red');
					}
				});
		}
	});
});
