
//TEST JSON OBJECT
var obj = {
	cities: [
		{
			name: "Tokyo",
			latLng: [35.6800,139.7700],
			playerId: 3
		},

		{
			name: "Jakartka",
			latLng: [-6.2000, 106.8000],
			playerId: 2
		}
	]
}
//TODO sort Ajax call for JSON data

var processJson = function(obj){
	buildCities;
	buildCityArray;

	for(var i = 0; i < cities.length; i++) {
		var city = cities[i];
		cityArray.push(new City(city.name,city.latLng,city.playerId));
	};
	return cityArray;
};

var buildCityArray = (function(){
	return cityArray = [];
})();

var buildCities = (function(){
	return cities = obj.cities;
})();