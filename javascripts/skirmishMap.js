var SkirmishMap = (function(){
	
	var displayCity = function(city){
		new google.maps.Marker({
			position: new google.maps.LatLng(city.latLng[0], city.latLng[1]),
			map: map,
			title: city.name,
			playerId: city.playerId
		});
	};

	var displayCities = function(cities){
		for(var i = 0; i < cities.length; i++){
			var city = cities[i];
			SkirmishMap.displayCity(city);
		};
	};

	var map;
	var mapOptions;

	function initialize() {
		mapOptions = {
		  center: new google.maps.LatLng(-41.2889, 174.7772),
		  zoom: 10
		};
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	}
	

	return	{
		displayCity: displayCity,
		displayCities: displayCities
	};

})();