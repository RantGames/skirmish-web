/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, SkirmishDOM, beforeEach, afterEach */
"use strict";

describe("SkirmishDOM", function () {

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