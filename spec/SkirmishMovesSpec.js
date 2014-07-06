/*global describe, it, $, spyOn, expect, beforeEach, SkirmishApp, SkirmishMoves, SkirmishGameState, jasmine */
"use strict";

describe("SkirmishMoves", function () {
    it('stores moves', function () {
        var move = jasmine.createSpy('move');
        SkirmishMoves.addMove(move);
        expect(SkirmishMoves.moves).toContain(move);
    });

    describe('.Move', function () {
        beforeEach(function () {
            this.rawMove = {
                origin_ids: [1, 2, 3],
                target_id: 1,
                action: 'attack_unit'
            };

            this.move = new SkirmishMoves.Move(this.rawMove);
        });

        it('sets the origin_ids', function () {
            expect(this.move.origin_ids).toEqual(this.rawMove.origin_ids);
        });

        it('sets the target_id', function () {
            expect(this.move.target_id).toEqual(this.rawMove.target_id);
        });

        it('sets the action', function () {
            expect(this.move.actions).toEqual(this.rawMove.actions);
        });
    });
});