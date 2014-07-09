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
      console.log(rawMove)
      SkirmishApp.sendMove(rawMove);

    }
    clickCountUpdater(city);
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
      lastCityClicked.id != city.id &&
      SkirmishGeo.checkRange(city, lastCityClicked)
      );
  };

  var clickCountUpdater = function (city) {
    var myCity = (city.playerId == SkirmishGameState.getCurrentPlayerId())

    console.log('Player: '+SkirmishGameState.getCurrentPlayerId())
    if( myCity && city.id == lastCityClicked.id) {
      clickCount += 1;
      if (clickCount > 5) {clickCount = 5};
      SkirmishDOM.flash(clickCount*20 +'% of units selected in '+city.name)
    } else {
      if (myCity) {
        clickCount = 1;
        SkirmishDOM.flash('20% of units selected in '+city.name)
      } else {
        clickCount = 0;
      }
    };

    lastCityClicked = city

  }

  publik.hoverHandler = function (city) {
    var cityCircle = SkirmishMap.displayCircle(city);
    setTimeout(function() {
        SkirmishMap.clearCircle(cityCircle)
    }, 1500);
  }

  return publik

}());


