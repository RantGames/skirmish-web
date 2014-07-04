
	var map;
	var mapOptions;

	function initialize() {
		mapOptions = {
		  center: new google.maps.LatLng(-41.2889, 174.7772),
		  zoom: 10
		};
		map = new google.maps.Map(document.getElementById("map-canvas"),
		    mapOptions);

		var marker = new google.maps.Marker({
		position: new google.maps.LatLng(-41.2889, 174.7772),
		map: map,
		title: 'title'
		});
	
	}
	google.maps.event.addDomListener(window, 'load', initialize);

	



