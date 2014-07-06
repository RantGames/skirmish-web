/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $loginForm = $('#login-form');
    var $testMoveForm = $('#test-move-form');

    function getLoginFormValue(name) {
        //  TODO: fix ickyness here. Have to refer to SkirmishDOM.$loginForm to allow mocking.
        //        Should break login form out into a module
        return SkirmishDOM.$loginForm.find('input[name="' + name + '"]').val();
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
        throw 'not impmemented';
    }

    return {
        getLoginCredentials: getLoginCredentials,
        $loginForm: $loginForm,
        $testMoveForm: $testMoveForm,
        getTestMove: getTestMove,
        hideLoginForm: hideLoginForm
    };
}());