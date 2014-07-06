/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, City, SkirmishGameProcessor, jasmine */
"use strict";

describe("SkirmishGameProcessor", function () {
    beforeEach(function () {
        this.gameState = {
            game: {
                id: 1,
                players: [
                    {
                        id: 2,
                        name: "Test",
                        cities: [
                            {
                                id: 1,
                                name: "123 Fake St",
                                latitude: 33.5091667,
                                longitude: -111.8983333,
                                population: 225796,
                                units: [
                                    {
                                        id: 1,
                                        unit_type: "infantry",
                                        attack: 1,
                                        defense: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
    });

    describe('processCities', function () {
        beforeEach(function () {
            var cities = SkirmishGameProcessor.processCities(this.gameState);
            this.city = cities[0];
        });

        it('sets the city name', function () {
            expect(this.city.name).toBe('123 Fake St');
        });

        it('sets the city coordinates', function () {
            expect(this.city.latLng).toEqual([33.5091667, -111.8983333]);
        });

        it("sets the city's player id", function () {
            expect(this.city.playerId).toBe(2);
        });

        it("populates the city with units", function () {
            expect(this.city.units).toEqual(
                [
                    {
                        id: 1,
                        unit_type: "infantry",
                        attack: 1,
                        defense: 1
                    }
                ]
            );
        });

    });
});