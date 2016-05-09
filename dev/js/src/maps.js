/* globals google */
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define(['src/lib/lazy'], function (lazy) {
	var protocol = (document.location.protocol === 'https:' ? 'https' : 'http');
	lazy(protocol + '://www.google.com/jsapi')
		.then(function () {
			google.load('maps', 3, {
				other_params: 'key=AIzaSyCtGiZenbRCFVDi1nE8Ux8hbjOq2puUp7c',
				callback: initialize
			});
		});

	function initialize() {
		var ll = new google.maps.LatLng(-23.539252, -46.7062753);
		var mapCanvas = document.getElementById('map-canvas');
		var mapOptions = {
			zoom: 17,
			center: ll,
			mapTypeControl: false,
			panControl: false,
			scrollwheel: false,
			zoomControl: true
		};
		var map = new google.maps.Map(mapCanvas, mapOptions);
		var marker = new google.maps.Marker({
			position: ll,
			map: map,
			title: 'minBy'
		});
		var infowindow = new google.maps.InfoWindow({
			content: [
				'<div class="infowindow-tex">',
				'<h3>minBy</h3>',
				'<p>Rua Aibi, 102 - Conjunto 21<br>São Paulo - SP</p>',
				'</div>'
			].join('')
		});
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	}
});
