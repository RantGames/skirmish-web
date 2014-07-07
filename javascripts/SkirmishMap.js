/*global $, jQuery, alert, document, SkirmishClient, SkirmishMap, SkirmishGameState, google */
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
            title: '[' + city.id + '] ' + city.name + ', owned by ' + SkirmishGameState.players()[city.playerId] + ', Units: ' + city.units.length,
            icon: iconBase + city.playerId + '?s=40&d=retro',
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

    function CityOverlay(city) {
        this.city = city;
        this.setMap(map);
    }

    CityOverlay.prototype = new google.maps.OverlayView; //subclassing google's overlayView

    CityOverlay.prototype.onAdd = function () {
        this.overlay = $('<div class="city-overlay">' + this.city.name + '</div>');
        this.overlay.className = 'city-overlay';
        this.getPanes().overlayImage.appendChild(this.overlay); //attach it to overlay panes so it behaves like markers
    };

    CityOverlay.prototype.onRemove = function () {
        this.overlay.remove();
    };

    CityOverlay.prototype.draw = function () {
        var position = this.getProjection().fromLatLngToDivPixel(this.get('position')); // translate map latLng coords into DOM px coords for css positioning
        this.overlay.css({
            'top'   : position.y + 'px',
            'left'  : position.x + 'px'
        });
    };



    return {
        displayCity: displayCity,
        displayCities: displayCities,
        initialize: initialize,
        CityOverlay: CityOverlay,
    };

}());