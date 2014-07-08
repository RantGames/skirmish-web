/*global $, jQuery, SkirmishMap, SkirmishApp*/

"use strict";

var SkirmishTroupMovement = (function () {

  var publik = {};

  publik.clickHandler = function (city) {
    console.log('clicked on'+city.playerId);
  };

  publik.hoverHandler = function (city) {
    var cityCircle = SkirmishMap.displayCircle(city);
    setTimeout(function() {
        SkirmishMap.clearCircle(cityCircle)
    }, 1000);
  }

  return publik

}());


