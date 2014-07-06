/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, City, SkirmishGameProcessor, jasmine */
"use strict";

describe("City model", function () {
    beforeEach(function () {
        this.city = new City("London", [123, 556], 4);
    });

    it("City object is created with name", function () {
        expect(this.city.name).toBe("London");
    });

    it("City object is created with latLng", function () {
        expect(this.city.latLng).toEqual([123, 556]);
    });

    it("City object has a player ID", function () {
        expect(this.city.playerId).toEqual(4);
    });

    it("Can add a unit", function () {
        var unit = {
            id: 1,
            unit_type: "infantry",
            attack: 1,
            defense: 1
        };

        this.city.addUnit(unit);

        expect(this.city.units).toContain(unit);
    });

});