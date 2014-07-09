/*global $, jQuery, alert, document, SkirmishTroupMovement, SkirmishClient, SkirmishMap, SkirmishGameState, google, Handlebars */
"use strict";

var SkirmishMap = (function () {
<<<<<<< HEAD
    var map, cityOverlayTemplate, miniCityOverlayTemplate, overlays, smallestCityOverlayTemplate;
=======
    var map, cityOverlayTemplate, miniCityOverlayTemplate, overlays, MIN_CITY_DISTANCE;
>>>>>>> 0378c7a4f6cd29eb944b011eb51fc8e8b2bb0e0c
    overlays = [];

    MIN_CITY_DISTANCE = 500;

    function compileTemplates() {
        cityOverlayTemplate = Handlebars.compile($("#city-overlay-template").html());
        smallestCityOverlayTemplate = Handlebars.compile($("#smallest-city-overlay-template").html());
        miniCityOverlayTemplate = Handlebars.compile($("#mini-city-overlay-template").html());
    }

    function zoomChanged() {
        var zoom = map.getZoom();
        overlays.forEach(function (overlay) {
            overlay.scaleTemplate(zoom);
        });

        declusterCities(SkirmishGameState.cities(), MIN_CITY_DISTANCE / zoom);
    }

    function initialize() {
        var mapOptions;

        compileTemplates();

        mapOptions = {
            center: new google.maps.LatLng(39.8282, -98.5795),
            disableDoubleClickZoom: true,
            streetViewControl: false,
            styles: style,
            zoom: 5
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
<<<<<<< HEAD
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
=======
        var range = 1000,
            circleOptions,
            cityCircle;

        circleOptions = {
            strokeColor: "#000FFF",
            strokeOpacity: 0.35,
            strokeWeight: 10,
            fillColor: "#0000FF",
            fillOpacity: 0.25,
            map: map,
            center: new google.maps.LatLng(city.latLng[0], city.latLng[1]),
            radius: range * 1000
>>>>>>> 0378c7a4f6cd29eb944b011eb51fc8e8b2bb0e0c
        };

        cityCircle = new google.maps.Circle(circleOptions);
        return cityCircle;
    }

    function clearCircle(cityCircle) {
        cityCircle.setMap(null);
    }

    function setupDomClickListener(cityOverlay) {
        google.maps.event.addDomListener(cityOverlay.overlay[0], 'click', function () {
            SkirmishTroupMovement.clickHandler(cityOverlay.city);
        });
    }

    function setupDomHoverListener(cityOverlay) {
        google.maps.event.addDomListener(cityOverlay.overlay[0], 'mouseover', function () {
            SkirmishTroupMovement.hoverHandler(cityOverlay.city);
        });
    }

    function displayCity(city) {
        var cityOverlay = new SkirmishMap.CityOverlay(city);
        overlays.push(cityOverlay);
        setupDomClickListener(cityOverlay);
        setupDomHoverListener(cityOverlay);
    }

    // FIXME - copied from SkirmishTroupMovements, should be common

    function rad(x) {
        return x * Math.PI / 180;
    }

    function getDistance(p1, p2) {
        var R,
            dLat,
            dLong,
            a,
            c,
            d;

        R = 6378137; // Earth’s mean radius in meter
        dLat = rad(p2.lat - p1.lat);
        dLong = rad(p2.lng - p1.lng);
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d = R * c;
        return d / 1000; // returns the distance in meter
    }

    function cityDistance(cityA, cityB) {
        return getDistance({lat: cityA.latLng[0], lng: cityA.latLng[1]}, {lat: cityB.latLng[0], lng: cityB.latLng[1]});
    }

    function nearestOtherCityDistance(cities, ourCity) {
        var cityDistances = cities.map(function (city) {
            if (city === ourCity) {
                return 10 * 10 * 10 * 10000000;
            }
            return cityDistance(city, ourCity);
        });

        return Math.min.apply(this, cityDistances);
    }

    function setupDomClickListener(cityOverlay) {
        google.maps.event.addDomListener(cityOverlay.overlay[0], 'click', function() {
            SkirmishTroupMovement.clickHandler(cityOverlay.city);
        });
    }

    function getCitiesWithCloseNeighbours(cities, minDistance) {
        console.log(minDistance);
        return cities.filter(function (city) {
            return nearestOtherCityDistance(cities, city) < minDistance;
        });
    }

    function getClosestNeighbour(cities, city) {
        var closestCity = null,
            minDistance = 0,
            otherCityDistance;

        cities.forEach(function (otherCity) {
            if (otherCity === city) {
                return false;
            }

            otherCityDistance = cityDistance(city, otherCity);

            if (closestCity === null || otherCityDistance < minDistance) {
                minDistance = otherCityDistance;
                closestCity = otherCity;
            }

        });

        return closestCity;
    }

    function moveCityAwayFromNeighbours(cities, city) {
        // finds the closest neighbour
        // finds distance between
        // moves city that distance away again

        var closestNeighbour = getClosestNeighbour(cities, city);

        console.log('Moving ' + city.name + ' away from ' + closestNeighbour.name);

        var distanceLat = closestNeighbour.latLng[0] - city.latLng[0];
        var distanceLng = closestNeighbour.latLng[1] - city.latLng[1];

        var moveFactor = 0.5;

        city.latLng[0] -= distanceLat;
        city.latLng[1] -= distanceLng;
    }

    function declusterCities(cities, minDistance) {
        var nearCities = getCitiesWithCloseNeighbours(cities, minDistance),
            moveCity = function (city) { moveCityAwayFromNeighbours(cities, city); };

        while (nearCities.length > 0) {
            console.log('remaining bad cities', nearCities.length);
            nearCities.map(moveCity);

            nearCities = getCitiesWithCloseNeighbours(cities);
        }
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
        if(zoom <= 4) {
            this.renderSmallestTemplate();
        }
        else if (zoom <= 5) {
            this.renderMiniTemplate();
        } 
        else {
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

    CityOverlay.prototype.renderSmallestTemplate = function () {
        this.renderHTML(smallestCityOverlayTemplate({
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
