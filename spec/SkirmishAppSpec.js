/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishMap, SkirmishDOM, SkirmishClient, SkirmishGameState, jasmine, context, window */
"use strict";
describe("SkirmishApp", function () {
    describe('processUpdate()', function () {
        beforeEach(function () {

            this.rawGame = jasmine.createSpy('raw game data');
            spyOn(SkirmishGameState, 'process');

            this.processedCities = jasmine.createSpy('processed cities');
            spyOn(SkirmishGameState, 'cities').and.returnValue(this.processedCities);
            spyOn(SkirmishMap, 'displayCities');
            spyOn(SkirmishApp, 'checkVictory');

            SkirmishApp.processUpdate(this.rawGame);
        });

        it('asks SkirmishGameState to process the new game state', function () {
            expect(SkirmishGameState.process).toHaveBeenCalledWith(this.rawGame);
        });

        it('gets the cities from SkirmishGameState', function () {
            expect(SkirmishGameState.cities).toHaveBeenCalled();
        });

        it('asks SkirmishMap to render the cities', function () {
            expect(SkirmishMap.displayCities).toHaveBeenCalledWith(this.processedCities);
        });

        it('checks if someone has won', function () {
            expect(SkirmishApp.checkVictory).toHaveBeenCalled();
        });

    });

    describe('updateGameState()', function () {

        it('tries to pull data from SkirmishClient#pullGameState', function () {
            spyOn(SkirmishClient, 'pullGameState');

            SkirmishApp.updateGameState();

            expect(SkirmishClient.pullGameState).toHaveBeenCalledWith(SkirmishApp.processUpdate, SkirmishApp.joinNewGame);
        });
    });

    describe("sendMove()", function () {
        beforeEach(function () {
            var testMove = {
                unitCount: 5,
                originId: 1,
                targetId: 2,
                moveType: 'move',
            };
            spyOn(SkirmishDOM, 'getTestMove').and.returnValue(testMove);
            this.fakeUnitIds = [4, 5, 6];

            spyOn(SkirmishGameState, 'getUnitIdsForCity').and.returnValue(this.fakeUnitIds);
            spyOn(SkirmishClient, 'sendMove');
            spyOn(SkirmishGameState, 'gameId').and.returnValue(7);

            SkirmishApp.sendMove(testMove);
        });

        it("gets the ids of the units to move", function () {
            expect(SkirmishGameState.getUnitIdsForCity).toHaveBeenCalledWith({city: 1, unitCount: 5});
        });

        it("sends the move to SkirmishClient to send to the server", function () {
            expect(SkirmishClient.sendMove).toHaveBeenCalledWith({
                originIds: this.fakeUnitIds,
                targetId: 2,
                action: 'move_unit',
                gameId: 7
            });
        });
    });

    describe("updatePlayerId()", function () {
        it('tells SkirmishGameState to set the current player id', function() {
            spyOn(SkirmishGameState, 'setCurrentPlayerId');
            var fakeId = 2;
            var fakeData = {user_id: fakeId};
            SkirmishApp.updatePlayerId(fakeData);

            expect(SkirmishGameState.setCurrentPlayerId).toHaveBeenCalledWith(fakeId);
        })
    })

    describe('checkVictory()', function () {
        it('checks SkirmishGameState to see if someone has won', function () {
            spyOn(SkirmishGameState, 'getWinner');

            SkirmishApp.checkVictory();

            expect(SkirmishGameState.getWinner).toHaveBeenCalled();
        });

        it('throws an alert if someone has won', function () {
            spyOn(SkirmishGameState, 'getWinner').and.returnValue('Nick');
            spyOn(window, 'alert');

            SkirmishApp.checkVictory();

            expect(window.alert).toHaveBeenCalledWith('Winner: Nick!');
        });
    });
});
