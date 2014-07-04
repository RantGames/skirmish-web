// var marker = new google.maps.Marker({
// 		position: new google.maps.LatLng(-41.2889, 174.7772),
// 		map: map,
// 		title: 'title'
// 		});

// City {
// 			name: "Tokyo",
// 			latLng: [35.6800,139.7700],
// 			playerId: 3
// 		};


// for(var i = 0; i < cities.length; i++) {
// 	var city = cities[i];
// 	cityArray.push(new City(city.name,city.latLng,city.playerId));
// };




// var x = cityArray[0]; // Access the first City object
// var lat = x.latLng[0];
// var lng = x.latlng[1];
// var name = x.name;
// var playerId = x.playerId;
var markerMethod = function(){

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


