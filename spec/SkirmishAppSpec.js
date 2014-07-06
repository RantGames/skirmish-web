/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishMap, SkirmishDOM, SkirmishClient, SkirmishGameState, jasmine */
"use strict";
describe("SkirmishApp", function () {
    describe('login()', function () {
        beforeEach(function () {
            this.fakeCredentials = {
                email: 'neo@matr.ix',
                password: 'swordfish'
            };

            var that = this;

            spyOn(SkirmishDOM, 'getLoginCredentials').and.callFake(function () {
                return that.fakeCredentials;
            });
        });

        describe('credential flow', function () {
            beforeEach(function () {
                spyOn(SkirmishClient, 'login');
            });

            it('gets credentials from SkirmishDOM', function () {
                SkirmishApp.login();
                expect(SkirmishDOM.getLoginCredentials).toHaveBeenCalled();
            });

            it('logs in to SkirmishClient', function () {
                SkirmishApp.login();
                expect(SkirmishClient.login).toHaveBeenCalledWith(this.fakeCredentials.email, this.fakeCredentials.password, jasmine.any(Function));
            });
        });


        it('hides the login form if login was successful', function () {
            spyOn(SkirmishDOM, 'hideLoginForm');

            spyOn(SkirmishClient, 'login').and.callFake(function (e, p, successfulCallback) {
                successfulCallback();
            });

            SkirmishApp.login();

            expect(SkirmishDOM.hideLoginForm).toHaveBeenCalled();
        });
    });

    describe('updateGameState()', function () {
        beforeEach(function () {

            this.rawGame = jasmine.createSpy('raw game data');
            this.processedCities = jasmine.createSpy('processed cities');

            var that = this;

            spyOn(SkirmishClient, 'pullGameState').and.callFake(function (successfulCallback) {
                successfulCallback(that.rawGame);
            });
            spyOn(SkirmishGameState, 'process');
            spyOn(SkirmishGameState, 'cities').and.returnValue(this.processedCities);
            spyOn(SkirmishMap, 'displayCities');
            SkirmishApp.updateGameState();
        });

        it('gets data from SkirmishClient#pullGameState', function () {
            expect(SkirmishClient.pullGameState).toHaveBeenCalledWith(SkirmishApp.successfulPull);
        });

        describe('Successful Pull', function () {
            it('asks SkirmishGameState to process the new game state', function () {
                expect(SkirmishGameState.process).toHaveBeenCalledWith(this.rawGame);
            });

            it('gets the cities from SkirmishGameState', function () {
                expect(SkirmishGameState.cities).toHaveBeenCalled();
            });

            it('asks SkirmishMap to render the cities', function () {
                expect(SkirmishMap.displayCities).toHaveBeenCalledWith(this.processedCities);
            });
        });
    });

    describe("sendMove()", function () {
        beforeEach(function () {
            var testMove = {
                unitCount: 5,
                originId: 1,
                targetId: 2,
            };
            spyOn(SkirmishDOM, 'getTestMove').and.returnValue(testMove);
            this.fakeUnitIds = [4, 5, 6];

            spyOn(SkirmishGameState, 'getUnitIdsForCity').and.returnValue(this.fakeUnitIds);
            spyOn(SkirmishClient, 'sendMove');
            spyOn(SkirmishGameState, 'gameId').and.returnValue(7);

            SkirmishApp.sendMove('move_unit');
        });

        it("gets the move data from SkirmishDOM", function () {
            expect(SkirmishDOM.getTestMove).toHaveBeenCalled();
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
});
