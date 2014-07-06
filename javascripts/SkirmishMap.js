var SkirmishMap = (function () {

    var map;
    function initialize() {
        console.log("SkirmishMap initializing");
        var mapOptions;
        mapOptions = {
          center: new google.maps.LatLng(39.8282, 98.5795),
          zoom: 10
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    };

    var displayCity = function(city){
        var iconBase = 'http://www.gravatar.com/avatar/';
        new google.maps.Marker({
            position: new google.maps.LatLng(city.latLng[0], city.latLng[1]),
            map: map,
            title: city.name + ' ' + city.playerId,
            icon: iconBase + '205e460b479e2e5b48aec07710c08d50?s=50',
            playerId: city.playerId
        });
    };

    var displayCities = function(cities){
        for(var i = 0; i < cities.length; i++){
            var city = cities[i];
            SkirmishMap.displayCity(city);
        };
    };

    return  {
        displayCity: displayCity,
        displayCities: displayCities,
        initialize: initialize
    };

})();