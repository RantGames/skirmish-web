/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishMap, SkirmishDOM, SkirmishClient, SkirmishGameProcessor, jasmine */
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
            spyOn(SkirmishGameProcessor, 'processCities').and.returnValue(this.processedCities);
            spyOn(SkirmishMap, 'displayCities');
            SkirmishApp.updateGameState();
        });

        it('gets data from SkirmishClient#pullGameState', function () {
            expect(SkirmishClient.pullGameState).toHaveBeenCalledWith(SkirmishApp.successfulPull);
        });

        describe('Successful Pull', function () {
            it('asks SkirmishGameProcessor to process the cities from the raw data', function () {
                expect(SkirmishGameProcessor.processCities).toHaveBeenCalledWith(this.rawGame);
            });

            it('asks SkirmishMap to render the cities', function () {
                expect(SkirmishMap.displayCities).toHaveBeenCalledWith(this.processedCities);
            });
        });
    });

    describe("sendMove()", function () {
        beforeEach(function () {
            spyOn(SkirmishDOM, 'getTestMove');
        });

        it("gets the move data from SkirmishDOM", function () {
            SkirmishApp.sendMove();
            expect(SkirmishDOM.getTestMove).toHaveBeenCalled();
        });
    });
});
