/*global $, jQuery, SkirmishMap, SkirmishDom, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};
  var clickCount = 0;
  var lastCityClicked = {id:-1};

  publik.clickHandler = function (city) {

    if (validMoveClick(city)) {

      var rawMove = collateRawMove(lastCityClicked, city)
      SkirmishApp.sendMove(rawMove);

    }
    clickCountUpdater(city);
  };

  var collateRawMove = function(lastCityClicked, city) {
    var moveType;

    if (isAttack(city, lastCityClicked)) {
        moveType = 'attack'
      } else {
        moveType = 'move'
      };

      var rawMove = {
        moveType: moveType,
        originId: lastCityClicked.id,
        targetId: city.id,
        unitCount: calculateUnits(lastCityClicked)
      };
    return rawMove
  }

  var calculateUnits = function(lastCityClicked) {
    var units = lastCityClicked.units.length;
    if (clickCount <= 5) { units = Math.ceil(units*clickCount/5) };
    return units
  };

  var isAttack = function(city, lastCityClicked) {
    return lastCityClicked.playerId != city.playerId
  };

  var validMoveClick = function(city) {
    return (clickCount > 0 && lastCityClicked != null
      && lastCityClicked != city && checkRange(city, lastCityClicked));
  };

  var checkRange = function(originCity, targetCity) {
    var p1 = {};
    var p2 = {};
    var range = 1000;
    p1.lat = originCity.latLng[0];
    p1.lng = originCity.latLng[1];
    p2.lat = targetCity.latLng[0];
    p2.lng = targetCity.latLng[1];
    var interCityDistance = getDistance(p1,p2)

    if(interCityDistance > range) {SkirmishDOM.flash('Target city not within range')};
    return interCityDistance <= range;
  };

    //Courtesy Mike Williams
    var rad = function(x) {
      return x * Math.PI / 180;
    };

    var getDistance = function(p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d/1000; // returns the distance in meter
    };
    //

  var clickCountUpdater = function (city) {
    var myCity = (city.playerId == SkirmishGameState.getCurrentPlayerId())

    console.log('Player: '+SkirmishGameState.getCurrentPlayerId())
    if( myCity && city.id == lastCityClicked.id) {
      clickCount += 1;
    } else {
      if (myCity) {
        clickCount = 1;
      } else {
        clickCount = 0;
      }
    };

    lastCityClicked = city

    console.log('Clickcount: '+clickCount)
  }

  publik.hoverHandler = function (city) {
    var cityCircle = SkirmishMap.displayCircle(city);
    setTimeout(function() {
        SkirmishMap.clearCircle(cityCircle)
    }, 1500);
  }

  return publik

}());


