/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $loginForm = $('#login-form'),
        $testMoveForm = $('#test-move-form');

    function getLoginFormValue(name) {
        //  TODO: fix ickyness here. Have to refer to SkirmishDOM.$loginForm to allow mocking.
        //        Should break login form out into a module
        return SkirmishDOM.$loginForm.find('input[name="' + name + '"]').val();
    }

    function getTestMoveFormValue(name) {
        return SkirmishDOM.$testMoveForm.find('input[name="' + name + '"]').val();
    }

    function hideLoginForm() {
        $loginForm.hide();
    }

    function getLoginCredentials() {
        return {
            email: getLoginFormValue('email'),
            password: getLoginFormValue('password')
        };
    }

    function getTestMove() {
        return {
            unitCount: parseInt(getTestMoveFormValue('unitCount'), 10),
            originId: parseInt(getTestMoveFormValue('originId'), 10),
            targetId: parseInt(getTestMoveFormValue('targetId'), 10),
            moveType: $testMoveForm.find('select').val(),
        };
    }

    return {
        getLoginCredentials: getLoginCredentials,
        $loginForm: $loginForm,
        $testMoveForm: $testMoveForm,
        getTestMove: getTestMove,
        hideLoginForm: hideLoginForm
    };
}());