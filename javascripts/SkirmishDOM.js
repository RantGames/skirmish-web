/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $testMoveForm = $('#test-move-form');
    var $messageBar = $('#message-bar');

    function getTestMoveFormValue(name) {
        return SkirmishDOM.$testMoveForm.find('input[name="' + name + '"]').val();
    }

    function getTestMove() {
        return {
            unitCount: parseInt(getTestMoveFormValue('unitCount'), 10),
            originId: parseInt(getTestMoveFormValue('originId'), 10),
            targetId: parseInt(getTestMoveFormValue('targetId'), 10),
            moveType: $testMoveForm.find('select').val(),
        };
    }

    function flash(message) {
        $messageBar.text(message);
    }

    return {
        $testMoveForm: $testMoveForm,
        getTestMove: getTestMove,
        flash: flash,
    };
}());