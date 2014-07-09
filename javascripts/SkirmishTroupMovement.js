/*global $, jQuery, SkirmishMap, SkirmishGeo, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};
  var clickCount = 0;
  var previousCityClicked = {id:-1};

  publik.setDefaults = function() {
    clickCount = 0
    previousCityClicked = {id:-1};
  }

  publik.clickCount = function () { clickCount} ;
  publik.setClickCount = function (value) {clickCount = value}

  publik.clickHandler = function (city) {

    if (publik.validMoveClick(previousCityClicked, city)) {
      var rawMove = publik.collateRawMove(previousCityClicked, city)
      SkirmishApp.sendMove(rawMove);
    }

    publik.clickCountUpdater(previousCityClicked, city);

    if (myCity(city)) {
      var plurUnit = clickCount == 1 ? 'unit' : 'units'
      SkirmishDOM.flash(clickCount+' '+plurUnit+' selected in '+city.name)
    }

    previousCityClicked = city;

  };

  publik.collateRawMove = function(previousCityClicked, city) {

    var moveType = isAttack(previousCityClicked, city) ? 'attack' : 'move'

    var rawMove = {
      moveType: moveType,
      originId: previousCityClicked.id,
      targetId: city.id,
      unitCount: publik.calculateUnits(previousCityClicked,clickCount)
    };

    return rawMove
  }

  publik.calculateUnits = function(previousCityClicked,clickCount) {
    var units = previousCityClicked.units.length;
    units = clickCount
    // if (clickCount <= 5) { units = Math.ceil(units*clickCount/5) };
    return units
  };

  publik.validMoveClick = function(previousCityClicked, city) {
    return (clickCount > 0 &&
      previousCityClicked != null &&
      !sameCity(previousCityClicked, city) &&
      SkirmishGeo.checkRange(previousCityClicked, city)
      );
  };

  publik.clickCountUpdater = function (previousCityClicked, city) {
    var max = maxClickCount(previousCityClicked, city)
    if(myCity(city) && sameCity(previousCityClicked, city)) {
      clickCount = (clickCount >= max ? max : clickCount + 1)
    } else {
      if (myCity(city) && max > 0) {clickCount = 1}
      else {clickCount = 0}
    };
    console.log(clickCount)
    return clickCount
  }

  var maxClickCount = function (previousCityClicked, city) {
    if (previousCityClicked.id == -1) {
      return city.units.length;
    } else {
      return previousCityClicked.units.length;
    }
  }

  publik.previousCityClicked = function () {
    return previousCityClicked;
  }

  publik.setPreviousCityClicked = function (value) {
    previousCityClicked = value;
  }

  var myCity = function(city) {
    return (city.playerId == SkirmishGameState.getCurrentPlayerId())
  }

  var sameCity = function(previousCityClicked, city) {
    return (previousCityClicked.id == city.id);
  };

  var isAttack = function(previousCityClicked, city) {
    return previousCityClicked.playerId != city.playerId
  };


  return publik

}());


