var SkirmishMap = (function(){

	var map;
	function initialize() {
		var mapOptions;
		mapOptions = {
		  center: new google.maps.LatLng(-41.2889, 174.7772),
		  zoom: 10
		};
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	};
	google.maps.event.addDomListener(window, 'load', initialize);

	var displayCity = function(city){
		var iconBase = '/skirmish-web/images/icons/';
		new google.maps.Marker({
			position: new google.maps.LatLng(city.latLng[0], city.latLng[1]),
			map: map,
			title: city.name + ' ' + city.playerId,
			icon: iconBase + 'soldier-1.png', 
			playerId: city.playerId
		});
	};

	var displayCities = function(cities){
		for(var i = 0; i < cities.length; i++){
			var city = cities[i];
			SkirmishMap.displayCity(city);
		};
	};

	return	{
		displayCity: displayCity,
		displayCities: displayCities
	};

})();