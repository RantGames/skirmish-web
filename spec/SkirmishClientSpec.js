/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, beforeEach, afterEach */
"use strict";
describe("SkirmishClient", function () {

    describe("sending a move", function () {
        beforeEach(function () {
            spyOn($, 'ajax');
            this.move = {
                gameId: 4,
                originIds: [1, 2, 3],
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
                    action: 'move_unit',
                    origin_ids: [1, 2, 3],
                    target_id: 2,
                },
                game_id: 4,
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

    describe("getCurrentPlayerId", function() {

        it('does getJSON call for player id', function () {
            spyOn($, 'getJSON')
            SkirmishClient.getCurrentPlayerId();
            expect($.getJSON).toHaveBeenCalled();
        });
    });

    describe("trash talk chat", function() {

        describe("sending chat message", function() {
            beforeEach( function () {
                spyOn($, 'ajax');
                spyOn($.fn, 'val').and.returnValue('Great day')
                SkirmishClient.sendChat();
                this.requestArgs = $.ajax.calls.argsFor(0)[0];
            });

            it('makes a POST request', function (){
                expect(this.requestArgs.type).toEqual('POST');
            });

            it("sends to the game_state/show url", function () {
                expect(this.requestArgs.url).toEqual('/chat');
            });

            it('sends message data', function () {
                expect(this.requestArgs.data.chat_message).toEqual('Great day')
            });

        });

        it('registers click button', function() {
            spyOn($.fn, "on");
            SkirmishClient.registerChatClick();
            expect($().on).toHaveBeenCalled();
        });


    })
});
