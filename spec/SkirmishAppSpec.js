/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishDOM, SkirmishClient, jasmine */
"use strict";
describe("SkirmishApp", function () {
    describe('start()', function () {
        it('registers the login function for the login form submit', function () {
            spyOn(SkirmishDOM.$loginForm, 'on');
            SkirmishApp.start();
            expect(SkirmishDOM.$loginForm.on).toHaveBeenCalledWith('submit', SkirmishApp.login);
        });
    });
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
});
