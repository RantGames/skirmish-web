"use strict";

var City = function (name, latLng, playerId, id) {
    this.name = name;
    this.latLng = latLng;
    this.playerId = playerId;
    this.units = [];
    this.id = id;
};

City.prototype.addUnit = function (unit) {
    this.units.push(unit);
};