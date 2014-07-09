/*global $, jQuery, SkirmishMap, SkirmishGeo, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};
  var clickCount = 0;
  var lastCityClicked = {id:-1};

  publik.clickCount = function () { clickCount};
  publik.setClickCount = function (value) {clickCount = value}

  publik.clickHandler = function (city) {

    if (publik.validMoveClick(city, lastCityClicked)) {

      var rawMove = publik.collateRawMove(lastCityClicked, city)
      SkirmishApp.sendMove(rawMove);
    }
    clickCountUpdater(city);
    if (myCity(city)) {
      SkirmishDOM.flash(clickCount*20 +'% of units selected in '+city.name)
    }

  };

  publik.collateRawMove = function(lastCityClicked, city) {

    var moveType = isAttack(city, lastCityClicked) ? 'attack' : 'move'

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

  var isAttack = function(city, lastCityClicked) {
    return lastCityClicked.playerId != city.playerId
  };

  publik.validMoveClick = function(city, lastCityClicked) {
    return (clickCount > 0 &&
      lastCityClicked != null &&
      !sameCity(city, lastCityClicked) &&
      SkirmishGeo.checkRange(city, lastCityClicked)
      );
  };

  var sameCity = function(city, lastCityClicked) {
    return (lastCityClicked.id == city.id);
  };

  var clickCountUpdater = function (city) {

    console.log('Player: '+SkirmishGameState.getCurrentPlayerId())
    if(myCity(city) && sameCity(city, lastCityClicked)) {
      clickCount = (clickCount > 5 ? 5 : clickCount + 1)
    } else {
      clickCount = (myCity(city) ? 1 : 0)
    };

    lastCityClicked = city
  }

  var myCity = function(city) {
    return (city.playerId == SkirmishGameState.getCurrentPlayerId())
  }

  publik.hoverHandler = function (city) {
    var cityCircle = SkirmishMap.displayCircle(city);
    setTimeout(function() {
        SkirmishMap.clearCircle(cityCircle)
    }, 1500);
  }

  return publik

}());


