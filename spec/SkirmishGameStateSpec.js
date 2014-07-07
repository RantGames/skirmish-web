/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, City, SkirmishGameState, jasmine */
"use strict";

describe("SkirmishGameState", function () {
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
                                id: 6,
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

    describe('processing gamestate', function () {
        beforeEach(function () {
            SkirmishGameState.process(this.gameState);
            this.city = SkirmishGameState.game.cities[0];
        });

        it('sets the game id', function () {
            expect(SkirmishGameState.game.id).toEqual(1);
        });

        describe('processing cities', function () {
            it('sets the city name', function () {
                expect(this.city.name).toBe('123 Fake St');
            });

            it('sets the city coordinates', function () {
                expect(this.city.latLng).toEqual([33.5091667, -111.8983333]);
            });

            it("sets the city's player id", function () {
                expect(this.city.playerId).toBe(2);
            });

            it("sets the city's id", function () {
                expect(this.city.id).toBe(6);
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

    describe('cities()', function () {
        beforeEach(function () {
            this.mockCity = jasmine.createSpy('fake city');
            SkirmishGameState.game = {
                cities: [this.mockCity]
            };
        });

        it('returns the cities in the processed gamestate', function () {
            expect(SkirmishGameState.cities()).toContain(this.mockCity);
        });
    });

    describe('gameId()', function () {
        it('returns the game id', function () {
            SkirmishGameState.game = { id: 7 };
            expect(SkirmishGameState.gameId()).toBe(7);
        });
    });

    describe('getUnitIdForCity()', function () {
        it('returns a list of units ids for the given city', function () {
            SkirmishGameState.game = {
                cities: [
                    {
                        id: 1,
                        units: [
                            {
                                id: 1
                            },
                            {
                                id: 2,
                            },
                            {
                                id: 6,
                            },
                        ]
                    }
                ]
            };

            var unitIds = SkirmishGameState.getUnitIdsForCity({
                unitCount: 3,
                city: 1,
            });

            expect(unitIds).toEqual([1, 2, 6]);
        });
    });
});