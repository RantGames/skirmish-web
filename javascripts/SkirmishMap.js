/*global $, jQuery, alert, document, SkirmishClient, SkirmishMap, google */
"use strict";

var SkirmishMap = (function () {

    var map;
    function initialize() {
        console.log("SkirmishMap initializing");
        var mapOptions;

        mapOptions = {
            center: new google.maps.LatLng(39.8282, -98.5795),
            zoom: 5
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    function displayCity(city) {
        var iconBase = 'http://www.gravatar.com/avatar/';

        return new google.maps.Marker({
            position: new google.maps.LatLng(city.latLng[0], city.latLng[1]),
            map: map,
            title: city.name + ' ' + city.playerId,
            icon: iconBase + '205e460b479e2e5b48aec07710c08d50?s=50',
            playerId: city.playerId
        });
    }

    function displayCities(cities) {
        var city,
            i;

        for (i = 0; i < cities.length; i += 1) {
            city = cities[i];
            SkirmishMap.displayCity(city);
        }
    }

    return {
        displayCity: displayCity,
        displayCities: displayCities,
        initialize: initialize
    };

}());