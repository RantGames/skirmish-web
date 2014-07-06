/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, City, SkirmishGameProcessor, jasmine */
"use strict";

describe("SkirmishGameProcessor", function () {
    it('can process raw game data into cities', function () {
        var gameDump,
            cities;

        gameDump = {
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

        cities = SkirmishGameProcessor.processCities(gameDump);

        expect(cities[0]).toEqual(new City('123 Fake St', [33.5091667, -111.8983333], 2));
    });
});