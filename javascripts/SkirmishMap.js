/*global $, jQuery, alert, document, SkirmishClient, SkirmishMap, SkirmishGameState, google, Handlebars */
"use strict";

var SkirmishMap = (function () {
    var map, cityOverlayTemplate, miniCityOverlayTemplate, overlays;
    overlays = [];

    function compileTemplates() {
        cityOverlayTemplate = Handlebars.compile($("#city-overlay-template").html());
        miniCityOverlayTemplate = Handlebars.compile($("#mini-city-overlay-template").html());
    }

    function zoomChanged() {
        var zoom = map.getZoom();
        overlays.forEach(function (overlay) {
            overlay.scaleTemplate(zoom);
        });
    }

    function initialize() {
        console.log("SkirmishMap initializing");
        var mapOptions;

        compileTemplates();

        mapOptions = {
            center: new google.maps.LatLng(39.8282, -98.5795),
            zoom: 5
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        google.maps.event.addListener(map, 'zoom_changed', zoomChanged);
    }

    function displayCity(city) {
        overlays.push(new SkirmishMap.CityOverlay(city));
    }

    function displayCities(cities) {
        var city,
            i;

        for (i = 0; i < cities.length; i += 1) {
            city = cities[i];
            SkirmishMap.displayCity(city);
        }
    }

    function clearOverlays() {
        overlays.forEach(function (overlay) {
            overlay.onRemove();
        });
    }

    function CityOverlay(city) {
        this.city = city;
        this.setMap(map);
        this.overlay = $('<div>');
    }

    function gravatarURL(playerId) {
        return 'http://www.gravatar.com/avatar/' + playerId + '?s=40&d=retro';
    }

    CityOverlay.prototype = new google.maps.OverlayView; //subclassing google's overlayView

    CityOverlay.prototype.onAdd = function () {
        this.scaleTemplate(map.getZoom());
        this.getPanes().overlayImage.appendChild(this.overlay[0]); //attach it to overlay panes so it behaves like markers
        this.draw();
    };

    CityOverlay.prototype.scaleTemplate = function (zoom) {
        if (zoom <= 5) {
            this.renderMiniTemplate();
        } else {
            this.renderFullTemplate();
        }
    };

    CityOverlay.prototype.renderHTML = function (html) {
        this.overlay.html(html);
    };

    CityOverlay.prototype.renderFullTemplate = function () {
        this.renderHTML(cityOverlayTemplate({
            city: this.city,
            playerName: SkirmishGameState.players()[this.city.playerId],
            gravatar: gravatarURL(this.city.playerId),
        }));
    };

    CityOverlay.prototype.renderMiniTemplate = function () {
        this.renderHTML(miniCityOverlayTemplate({
            gravatar: gravatarURL(this.city.playerId)
        }));
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
        clearOverlays: clearOverlays,
    };

}());