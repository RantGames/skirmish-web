/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $testMoveForm = $('#test-move-form');
    var $messageBar = $('#message-bar');
    var $chatBox = $('#chat-box')

    function flash(message) {
        $messageBar.text(message);
    }

    function chat(message) {
        $chatBox.text(message);
    }

    return {
        $chatBox: $chatBox,
        $messageBar: $messageBar,
        flash: flash,
        chat: chat
    };
}());
