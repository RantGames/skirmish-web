/*global $, jQuery, alert, document, SkimishTroupMovement, SkirmishClient, SkirmishMap, SkirmishGameState, google, Handlebars */
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
            disableDoubleClickZoom: true,
            streetViewControl: false,
            zoom: 5
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        google.maps.event.addListener(map, 'zoom_changed', zoomChanged);
    }

    function displayCircle(city) {

      var circleOptions = {
          strokeColor: "#000FFF",
          strokeOpacity: 0.35,
          strokeWeight: 10,
          fillColor: "#0000FF",
          fillOpacity: .25,
          map: map,
          center: new google.maps.LatLng(city.latLng[0],city.latLng[1]),
          radius: 1000000
        };

        var cityCircle = new google.maps.Circle(circleOptions);
        return cityCircle;
    }

    function clearCircle(cityCircle) {
        cityCircle.setMap(null);
    }


    function displayCity(city) {
        var cityOverlay = new SkirmishMap.CityOverlay(city)
        overlays.push(cityOverlay);
        setupDomClickListener(cityOverlay);
        setupDomHoverListener(cityOverlay);
    }

    function setupDomClickListener(cityOverlay) {
        console.log('set up event for city '+cityOverlay.overlay[0]);
        google.maps.event.addDomListener(cityOverlay.overlay[0], 'click', function() {
            SkirmishTroupMovement.clickHandler(cityOverlay.city);
        });
    }

    function setupDomHoverListener(cityOverlay) {
        google.maps.event.addDomListener(cityOverlay.overlay[0], 'mouseover', function() {
            SkirmishTroupMovement.hoverHandler(cityOverlay.city);
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

    function clearOverlays() {
        overlays.forEach(function (overlay) {
            overlay.onRemove();
        });
    }

    function CityOverlay(city) {
        this.city = city;
        this.setMap(map);
        this.overlay = $('<div></div>');
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
        this.overlay.empty();
        this.overlay.append($(html));
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
        setupDomClickListener: setupDomClickListener,
        displayCircle: displayCircle,
        clearCircle: clearCircle
     };

}());
