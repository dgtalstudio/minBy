/* globals XMLHttpRequest, FormData */

/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define([
	'utils',
	'src/lib/promise'
], function (utils) {
	var xhr = {};

	function _destroy(name) {
		xhr[name] = null;
		if ('Reflect' in window) {
			Reflect.deleteProperty(xhr, name);
		} else {
			delete xhr[name];
		}
	}

	function get(url, name) {
		name = name || url;
		return new Promise(function (resolve, reject) {
			if (xhr[name] && xhr[name] !== null && xhr[name].readystate !== 4) {
				xhr[name].abort();
			} else {
				xhr[name] = new XMLHttpRequest();
			}
			xhr[name].open('GET', url);
			xhr[name].onload = function () {
				if (xhr[name].status === 200) {
					resolve(xhr[name].response);
					_destroy(name);
				} else {
					reject(Error(xhr[name].statusText));
				}
			};
			xhr[name].onerror = function () {
				reject(Error('Network Error'));
			};
			xhr[name].onabort = function () {
				reject(Error('Request aborted'));
			};
			xhr[name].send();
		});
	}

	function post(url, frm, header, name) {
		name = name || url;
		header = header || {};
		return new Promise(function (resolve, reject) {
			var formElement;
			var formData;
			if (xhr[name] && xhr[name] !== null && xhr[name].readystate !== 4) {
				xhr[name].abort();
			} else {
				formElement = utils.isElement(frm) ? frm : document.querySelector(frm);
				if (formElement) {
					formData = new FormData(formElement);
					xhr[name] = new XMLHttpRequest();
					xhr[name].open('POST', url);
					xhr[name].withCredentials = true;
					Object.keys(header).forEach(function (k) {
						xhr[name].setRequestHeader(k, header[k]);
					});
					xhr[name].onload = function () {
						if (xhr[name].status === 200) {
							resolve(xhr[name].response);
							_destroy(name);
						} else {
							reject(Error(xhr[name].statusText));
						}
					};
					xhr[name].onerror = function () {
						reject(Error('Network Error'));
					};
					xhr[name].onabort = function () {
						reject(Error('Request aborted'));
					};
					xhr[name].send(formData);
				} else {
					reject(Error('Form not found'));
				}
			}
		});
	}

	return {
		get: get,
		post: post
	};
});
