/*global $, jQuery, SkirmishMap, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};

  var clickCount = 0;
  var lastCityClicked = null;

  publik.clickHandler = function (city) {
    var moveType;
    if (clickCount > 0 && lastCityClicked != null && lastCityClicked != city) {
      if (lastCityClicked.playerId != city.playerId) {
        moveType = 'attack'
      } else {
        moveType = 'move'
      }

      var units = lastCityClicked.units.length
      if (clickCount <= 5) { units = Math.ceil(units*clickCount/5) }

      var rawMove = {
        moveType: moveType,
        originId: lastCityClicked.id,
        targetId: city.id,
        unitCount: units,
      }

      console.log(rawMove)
      SkirmishApp.sendMove(rawMove);

    }
    clickCountUpdater(city);

  };


  var clickCountUpdater = function (city) {
    var myCity = (city.playerId == SkirmishGameState.getCurrentPlayerId())
    if (lastCityClicked != null) {

      if( myCity && city.id == lastCityClicked.id) {
        clickCount += 1;
      } else {
        if (myCity) {
          clickCount = 1;
        } else {
          clickCount = 0;
        }
      };

    }
    lastCityClicked = city

    console.log(lastCityClicked.id);
    console.log(clickCount)
  }

  publik.hoverHandler = function (city) {
    var cityCircle = SkirmishMap.displayCircle(city);
    setTimeout(function() {
        SkirmishMap.clearCircle(cityCircle)
    }, 1500);
  }

  return publik

}());


