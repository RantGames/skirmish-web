/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, SkirmishDOM, beforeEach, afterEach */
"use strict";

describe("SkirmishDOM", function () {
  xit ('sends flash message', function () {
    spyOn($.fn, 'text')
    SkirmishDOM.flash('howdy');
    expect(document.getElementById('#message-bar').html).toEqual('howdy')
  });

});
