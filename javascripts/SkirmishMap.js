/*global $, jQuery, alert, document, SkirmishClient, SkirmishMap, SkirmishGameState, google, Handlebars */
"use strict";

var SkirmishMap = (function () {
    var map, cityOverlayTemplate;

    function initialize() {
        cityOverlayTemplate = Handlebars.compile($("#city-overlay-template").html());
        console.log("SkirmishMap initializing");
        var mapOptions;

        mapOptions = {
            center: new google.maps.LatLng(39.8282, -98.5795),
            zoom: 5
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    function displayCity(city) {
        return new SkirmishMap.CityOverlay(city);
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
        this.city.playerName = SkirmishGameState.players()[this.city.playerId];
        this.overlay = $(cityOverlayTemplate(this.city));
        this.overlay.className = 'city-overlay';
        this.getPanes().overlayImage.appendChild(this.overlay[0]); //attach it to overlay panes so it behaves like markers
    };

    CityOverlay.prototype.onRemove = function () {
        this.overlay.remove();
    };

    CityOverlay.prototype.draw = function () {
        var overlayProjection,
            position;

        overlayProjection = this.getProjection();

        position = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(this.city.latLng[0], this.city.latLng[1]));

        this.overlay.css({
            top: (position.y - this.overlay.height() / 2) + 'px',
            left: (position.x - this.overlay.width() / 2) + 'px',
            position: 'absolute',
            background: 'white'
        });
    };



    return {
        displayCity: displayCity,
        displayCities: displayCities,
        initialize: initialize,
        CityOverlay: CityOverlay,
    };

}());