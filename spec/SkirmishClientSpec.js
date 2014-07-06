/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, beforeEach, afterEach */
"use strict";
describe("SkirmishClient", function () {
    describe("pulling gamestate", function(){
        beforeEach(function () {
            spyOn($, 'ajax');
            SkirmishClient.pullGameState();

            this.requestArgs = $.ajax.calls.argsFor(0)[0];
        });

        it("makes a GET request", function(){
            expect(this.requestArgs.type).toEqual('GET');
        });

        it("sends to the game_state/show url", function(){
            expect(this.requestArgs.url).toEqual('/game_state/show');
        });
    });

    describe('logging in', function () {
        describe('request arguments', function () {
            beforeEach(function () {
                spyOn($, 'ajax');
                SkirmishClient.login('neo@matr.ix', 'swordfish');

                this.requestArgs = $.ajax.calls.argsFor(0)[0];
            });

            it('is a post request', function () {
                expect(this.requestArgs.type).toEqual('POST');
            });

            it('sends to the sign in url', function () {
                expect(this.requestArgs.url).toEqual('/users/sign_in');
            });

            it('sends JSON content', function () {
                expect(this.requestArgs.contentType).toEqual("application/json");
                expect(this.requestArgs.dataType).toEqual("json");
            });

            it('sends the stringified credentials', function () {
                var expected_credentials = {
                    user: {
                        email: 'neo@matr.ix',
                        password: 'swordfish',
                        remember_me: '0'
                    }
                };

                expect(this.requestArgs.data)
                    .toEqual(JSON.stringify(expected_credentials));
            });
        });

        describe('callbacks', function () {
            beforeEach(function () {
                this.success = jasmine.createSpy('successCallback');
                this.failure = jasmine.createSpy('failureCallback');
            });

            it('calls the success callback on success', function () {
                spyOn($, 'ajax').and.callFake(function (params) {
                    params.success({success: true});
                });
                SkirmishClient.login('neo@matr.ix', 'swordfish', this.success);

                expect(this.success).toHaveBeenCalled();
            });

            it('calls the failure callback on failure', function () {
                spyOn($, 'ajax').and.callFake(function (params) {
                    params.error({ success: false });
                });

                SkirmishClient.login('neo@matr.ix', 'swordfish', this.success, this.failure);

                expect(this.failure).toHaveBeenCalled();
            });
        });
    });
});
