/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, beforeEach, afterEach */
"use strict";
describe("SkirmishClient", function () {

    describe("sending a move", function () {
        beforeEach(function () {
            spyOn($, 'ajax');
            this.move = {
                gameId: 4,
                originId: 6,
                quantity: 3,
                targetId: 2,
                action: 'move_unit'
            };
            SkirmishClient.sendMove(this.move);

            this.requestArgs = $.ajax.calls.argsFor(0)[0];
        });

        it("makes a GET request", function () {
            expect(this.requestArgs.type).toEqual('POST');
        });

        it("sends to the game_state/show url", function () {
            expect(this.requestArgs.url).toEqual('/move/create');
        });

        it('sends JSON content', function () {
            expect(this.requestArgs.contentType).toEqual("application/json");
        });

        it("receives JSON content", function () {
            expect(this.requestArgs.dataType).toBe('json');
        });

        it('sends the stringified move in the format expected by the server', function () {
            expect(JSON.parse(this.requestArgs.data)).toEqual({
                move: {
                    action: this.move.action,
                    origin_id: this.move.originId,
                    target_id: this.move.targetId,
                    quantity: this.move.quantity,
                },
                game_id: this.move.gameId,
            });
        });
    });

    describe("pulling gamestate", function () {
        beforeEach(function () {
            spyOn($, 'ajax');
            SkirmishClient.pullGameState();

            this.requestArgs = $.ajax.calls.argsFor(0)[0];
        });

        it("makes a GET request", function () {
            expect(this.requestArgs.type).toEqual('GET');
        });

        it("sends to the game_state/show url", function () {
            expect(this.requestArgs.url).toEqual('/game_state/show');
        });

        it("recieves JSON content", function () {
            expect(this.requestArgs.dataType).toBe('json');
        });
    });
});
