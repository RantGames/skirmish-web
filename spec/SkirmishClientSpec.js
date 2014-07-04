/*global describe, it, $, spyOn, expect, SkirmishClient, beforeEach */
"use strict";
describe("SkirmishClient", function () {
    describe('logging in', function () {
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
});
