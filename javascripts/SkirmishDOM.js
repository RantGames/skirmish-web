/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $testMoveForm = $('#test-move-form');
    var $messageBar = $('#message-bar');

    function flash(message) {
        $messageBar.text(message);
    }

    return {
        flash: flash,
    };
}());
