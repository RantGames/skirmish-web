/*global describe, it, $, jasmine, spyOn, expect, SkirmishClient, SkirmishDOM, beforeEach, afterEach */
"use strict";

describe("SkirmishDOM", function () {

  it('sets the text of the chat box', function () {
    spyOn(SkirmishDOM.$chatBox, 'text');
    SkirmishDOM.chat('howdy');
    expect(SkirmishDOM.$chatBox.text).toHaveBeenCalledWith('howdy');
  });

  it('sets the text of the flash message', function () {
    spyOn(SkirmishDOM.$messageBar, 'text');
    SkirmishDOM.flash('howdy');
    expect(SkirmishDOM.$messageBar.text).toHaveBeenCalledWith('howdy');
  });

});
