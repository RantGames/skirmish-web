/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $loginForm = $('#login-form');

    function hideLoginForm() {
        $loginForm.hide();
    }

    function getLoginCredentials() {
        throw "Not Implemented";
    }
    return {
        getLoginCredentials: getLoginCredentials,
        $loginForm: $loginForm,
        hideLoginForm: hideLoginForm
    };
}());