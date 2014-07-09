/*global $, jQuery, SkirmishMap, SkirmishGeo, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};
  var clickCount = 0;
  var lastCityClicked = {id:-1};

  publik.setDefaults = function() {
    clickCount = 0
    lastCityClicked = {id:-1};
  }

  publik.clickCount = function () { clickCount};
  publik.setClickCount = function (value) {clickCount = value}

  publik.clickHandler = function (city) {

    if (publik.validMoveClick(lastCityClicked, city)) {
      var rawMove = publik.collateRawMove(lastCityClicked, city)
      SkirmishApp.sendMove(rawMove);
    }

    publik.clickCountUpdater(lastCityClicked, city);

    if (myCity(city)) {
      SkirmishDOM.flash(clickCount*20 +'% of units selected in '+city.name)
    }

    lastCityClicked = city;

  };

  publik.collateRawMove = function(lastCityClicked, city) {

    var moveType = isAttack(lastCityClicked, city) ? 'attack' : 'move'

    var rawMove = {
      moveType: moveType,
      originId: lastCityClicked.id,
      targetId: city.id,
      unitCount: publik.calculateUnits(lastCityClicked,clickCount)
    };

    return rawMove
  }

  publik.calculateUnits = function(lastCityClicked,clickCount) {
    var units = lastCityClicked.units.length;
    if (clickCount <= 5) { units = Math.ceil(units*clickCount/5) };
    return units
  };

  publik.validMoveClick = function(lastCityClicked, city) {
    return (clickCount > 0 &&
      lastCityClicked != null &&
      !sameCity(lastCityClicked, city) &&
      SkirmishGeo.checkRange(lastCityClicked, city)
      );
  };

  publik.clickCountUpdater = function (lastCityClicked, city) {

    if(myCity(city) && sameCity(lastCityClicked, city)) {
      clickCount = (clickCount >= 5 ? 5 : clickCount + 1)
    } else {
      clickCount = (myCity(city) ? 1 : 0)
    };
    return clickCount
  }

  publik.setClickCount = function (value) {
    clickCount = value;
  }

  publik.lastCityClicked = function () {
    return lastCityClicked;
  }

  publik.setLastCityClicked = function (value) {
    lastCityClicked = value;
  }

  var myCity = function(city) {
    return (city.playerId == SkirmishGameState.getCurrentPlayerId())
  }

  var sameCity = function(lastCityClicked, city) {
    return (lastCityClicked.id == city.id);
  };

  var isAttack = function(lastCityClicked, city) {
    return lastCityClicked.playerId != city.playerId
  };


  return publik

}());


