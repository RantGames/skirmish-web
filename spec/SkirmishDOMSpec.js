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

    describe("getTestMove()", function () {
        describe('returns an object with move information from the form', function () {
            beforeEach(function () {
                var mockForm = '<form><input name="unitCount" value="3"><input name="originId" value="1"><input name="targetId" value="2"></form>';
                SkirmishDOM.$testMoveForm = $(mockForm);
                this.testMove = SkirmishDOM.getTestMove();
            });

            it('pulls out the number of units', function () {
                expect(this.testMove.unitCount).toEqual(3);
            });

            it('pulls out the origin city', function () {
                expect(this.testMove.originId).toEqual(1);
            });

            it('pulls out the target city', function () {
                expect(this.testMove.targetId).toEqual(2);
            });
        });
    });
});