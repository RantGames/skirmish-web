/*global $, jQuery, alert, document, SkirmishTroupMovement, SkirmishClient, SkirmishMap, SkirmishGameState, google, Handlebars */
"use strict";

var SkirmishMap = (function () {
    var map, cityOverlayTemplate, miniCityOverlayTemplate, overlays, MIN_CITY_DISTANCE;
    overlays = [];

    MIN_CITY_DISTANCE = 500;

    function compileTemplates() {
        cityOverlayTemplate = Handlebars.compile($("#city-overlay-template").html());
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
        };

        cityCircle = new google.maps.Circle(circleOptions);
        return cityCircle;
    }

    function clearCircle(cityCircle) {
        cityCircle.setMap(null);
    }

    function setupDomClickListener(cityOverlay) {
        console.log('set up event for city ' + cityOverlay.overlay[0]);
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
