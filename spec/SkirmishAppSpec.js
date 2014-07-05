/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishDOM, SkirmishClient */
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
            spyOn(SkirmishClient, 'login');

            SkirmishApp.login();
        });

        it('gets credentials from SkirmishDOM', function () {
            expect(SkirmishDOM.getLoginCredentials).toHaveBeenCalled();
        });

        it('logs in to SkirmishClient', function () {
            expect(SkirmishClient.login).toHaveBeenCalledWith(this.fakeCredentials.email, this.fakeCredentials.password);
        });
    });
});
