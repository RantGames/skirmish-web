/*global $, jQuery, SkirmishMap, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};

  var clickCount = 0;
  var lastCityClicked = null;

  publik.clickHandler = function (city) {
    if (lastCityClicked != null) {
      if(city.playerId == SkirmishGameState.getCurrentPlayerId() &&
        city.id == lastCityClicked.id) {
        clickCount += 1;
        console.log(lastCityClicked.id);
      } else {
        clickCount = 0;
        console.log(lastCityClicked.id);
      };
    }
    lastCityClicked = city
    console.log(clickCount)
  };

  publik.hoverHandler = function (city) {
    var cityCircle = SkirmishMap.displayCircle(city);
    setTimeout(function() {
        SkirmishMap.clearCircle(cityCircle)
    }, 1500);
  }

  return publik

}());


