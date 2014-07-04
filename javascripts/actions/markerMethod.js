var markerMethod = function(cityArray){

	for(var i = 0; i < cityArray.length; i++){
		var city = cityArray[i];
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(city.latLng[0], city.latLng[1]),
			map: map,
			title: city.name,
			playerId: city.playerId
		});
	};
};


