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
        var mapOptions;

        compileTemplates();

        mapOptions = {
            center: new google.maps.LatLng(39.8282, -98.5795),
            disableDoubleClickZoom: true,
            streetViewControl: false,
            styles: style,
            zoom: 7
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        google.maps.event.addListener(map, 'zoom_changed', zoomChanged);
    }

    var style= [ 
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {color: "#AAE0FA"}
            ]
        },
        {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
                {color: "#FFDC88"}
            ]
        },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
                {color: "#FFDC88"},
                {weight: 0.5}
            ]
        },
        {
            featureType: "landscape.natural.terrain",
            elementType: "geometry",
            stylers: [
                {color: "#F7D480"},
                {weight: 0.5}
            ]
        },
        {
            featureType: "administrative.country",
            elementType: "label",
            stylers: [
                { color: "#B3903C" },
            ]
        },
        {
            featureType: "administrative.country",
            elementType: "label.text",
            stylers: [
                { color: "#FFFFFF" },
            ]
        },
        {
            featureType: "administrative.province",
            elementType: "label.text.stroke",
            stylers: [
                { visibility: "off" }
            ]
        },
      
        {
            featureType: "administrative.locality",
            elementType: "label",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            featureType: "administrative.province",
            elementType: "geometry",
            stylers: [
                {color: "#FFFFFF" },
            ]
        },
        {
            featureType: "administrative",
            elementType: "labels.text.stroke",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { visibility: "on" },
                { color: "#E6C36F"}
            ]
        },
      
        {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        },
    ];

    function displayCircle(city) {
      var range = 1000

      var circleOptions = {
          strokeColor: "red",
          strokeOpacity: 0.25,
          strokeWeight: 2,
          fillColor: "red",
          fillOpacity: .09,
          map: map,
          center: new google.maps.LatLng(city.latLng[0],city.latLng[1]),
          radius: range * 1000
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

    function gravatarURL(gravatarHash) {
        return 'http://www.gravatar.com/avatar/' + gravatarHash + '?s=40&d=retro';
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

    CityOverlay.prototype.gravatarURL = function () {
        return gravatarURL(this.city.gravatarHash);
    };

    CityOverlay.prototype.renderFullTemplate = function () {
        this.renderHTML(cityOverlayTemplate({
            city: this.city,
            playerName: SkirmishGameState.players()[this.city.playerId],
            gravatar: this.gravatarURL()
        }));
    };

    CityOverlay.prototype.renderMiniTemplate = function () {
        this.renderHTML(miniCityOverlayTemplate({
            city: this.city,
            gravatar: this.gravatarURL()
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
            position: 'absolute'
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
