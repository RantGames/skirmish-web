/*global describe, it, $, jasmine, spyOn, expect, SkirmishTrigger, beforeEach, afterEach */
"use strict";

describe("SkirmishTrigger", function () {

    describe("update maps from pusher request", function () {

        it("has an event trigger to update map", function () {

            var pusher = new Pusher('013b1cfdc9072c8dbe04');
            var channel = pusher.subscribe('skirmish_channel');
            spyOn(channel, 'bind')
            SkirmishTrigger.registerUpdateMapEvent(pusher, channel);
            expect(channel.bind).toHaveBeenCalled()
        });

    });

});
