var SkirmishData = (function(){


	var processJson = function(data){
		var cityArray = [];
		var cities = data.cities;
		for(var i = 0; i < cities.length; i++) {
			var city = cities[i];
			cityArray.push(new City(city.name,city.latLng,city.playerId));
		};
		return cityArray;
	};

	return	{
		processJson: processJson
	}

})();
