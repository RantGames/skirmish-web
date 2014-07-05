/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, SkirmishDOM, beforeEach, afterEach */
"use strict";

describe("SkirmishDOM", function () {
    describe("getLoginCredentials()", function () {
        it('pulls the credentials from the login form', function () {
            var mockForm = '<form id="login-form" action="">' +
                '<input type="email" name="email" required value="foo@bar.org">' +
                '<input type="password" name="password" required value="swordfish">' +
                '<input id="submit-login" type="submit" value="Login">' +
                '</form>',
                expected_credentials = {
                    email: 'foo@bar.org',
                    password: 'swordfish'
                };

            SkirmishDOM.$loginForm = $(mockForm);

            expect(SkirmishDOM.getLoginCredentials()).toEqual(expected_credentials);
        });
    });
});