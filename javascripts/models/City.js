"use strict";

var City = function (name, latLng, playerId) {
    this.name = name;
    this.latLng = latLng;
    this.playerId = playerId;
    this.units = [];
};

City.prototype.addUnit = function (unit) {
    this.units.push(unit);
};