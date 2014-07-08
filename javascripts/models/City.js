"use strict";

var City = function (name, latLng, playerId, id, gravatarHash) {
    this.name = name;
    this.latLng = latLng;
    this.playerId = playerId;
    this.units = [];
    this.id = id;
    this.gravatarHash = gravatarHash;
};

City.prototype.addUnit = function (unit) {
    this.units.push(unit);
};