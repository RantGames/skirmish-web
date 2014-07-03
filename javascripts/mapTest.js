$(document).ready(function(){
	function initialize() {
	var mapOptions = {
	  center: new google.maps.LatLng(-41.2889, 174.7772),
	  zoom: 8
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);
	}
	google.maps.event.addDomListener(window, 'load', initialize);
});