/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishDOM */
"use strict";
describe("SkirmishApp", function () {
    describe('start()', function () {
        it('registers the login function for the login form submit', function () {
            spyOn(SkirmishDOM.$loginForm, 'on');
            SkirmishApp.start();
            expect(SkirmishDOM.$loginForm.on).toHaveBeenCalledWith('submit', SkirmishApp.login);
        });
    });
});
