/* globals google */
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */
/* eslint babel/object-shorthand: 0 */

'use strict';

define(['gmaps'], function () {
	var ll = new google.maps.LatLng(-23.5566237, -46.6877229);
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
			'<p>Rua Aspicuelta, 223 - Vila Madalena - 05433-010 - São Paulo, SP</p>',
			'</div>'
		].join('')
	});
	google.maps.event.addListener(marker, 'click', function () {
		infowindow.open(map, marker);
	});
// google.maps.event.addDomListener(window, 'load', initialize);
});
